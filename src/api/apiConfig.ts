import axios from "axios";
import {logout, refreshToken} from "./authApi";
import {getLocalStorageToken, SessionData, setLocalStorageString, setLocalStorageToken} from "../hooks/authenticator";

let refreshing = false;

const apiConfig = {
    url: (window as any)?.env?.REACT_APP_API_URL ?? "",
};

const axiosInstance = axios.create({
    baseURL: apiConfig.url,
    headers: {
        Accept: "application/hal+json",
    }
});

const queryKeys = {
    CRYPTOS_GET_ALL: "cryptos_get_all",
    CIPHERS_GET_ALL: "ciphers_get_all",
    RANSOMS_GET_ALL: "ransoms_get_all",
    RANSOMS_GET_ONE: "ransoms_get_one",
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry && !refreshing) {
            originalRequest._retry = true;
            refreshing = true;
            try {
                const session = await refreshToken();
                const token = (session.data as SessionData).token;
                setLocalStorageToken(token);
                setLocalStorageString(JSON.stringify(session.data));
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
                originalRequest.headers.Authorization = `Bearer ${token}`;
            } catch {
                logout();
            } finally {
                refreshing = false;
            }

            return axiosInstance(originalRequest);
        }

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use((config) => {
    const token = getLocalStorageToken();

    if(config?.headers?.Authorization === undefined) {
        config = {
            ...config,
            headers: {
                ...config?.headers,
                Authorization: `Bearer ${token}`,
            }
        }
    }

    return config;
});

export { apiConfig, axiosInstance, queryKeys };