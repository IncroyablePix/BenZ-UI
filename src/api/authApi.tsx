import {axiosInstance} from "./apiConfig";
import {setLocalStorageString, setLocalStorageToken} from "../hooks/authenticator";

export interface UserCredentials {
    username: string;
    password: string;
}

export function verifyToken() {
    return axiosInstance.get("/tokens/validity");
}

export function refreshToken() {
    return axiosInstance.post("/tokens/refreshment", {}, { withCredentials: true });
}

export function login(user: UserCredentials) {
    return axiosInstance.post("/tokens", user, { withCredentials: true });
}

export function logout() {
    setLocalStorageToken("");
    setLocalStorageString("{}");
}