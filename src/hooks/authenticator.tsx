import React, {useEffect} from "react";
import {login} from "../api/authApi";

const AUTH_ENTRY = "benz_session_data";
const TOKEN_ENTRY = "benz_resource_token";

export interface SessionMechanisms {
    sessionData?: SessionData,
    isLoggedIn: boolean,
    hasLoginFailed: boolean
    logOut?: () => void,
    logIn?: (identifier: string, password: string) => void
}

export function setLocalStorageString(value: string) {
    localStorage.setItem(AUTH_ENTRY, value);
    window.dispatchEvent(
        new StorageEvent("storage", { key: AUTH_ENTRY, newValue: value })
    );
}

export function setLocalStorageToken(token: string) {
    localStorage.setItem(TOKEN_ENTRY, token);
}

export function getLocalStorageToken() {
    return localStorage.getItem(TOKEN_ENTRY);
}

export interface SessionData {
    id: number,
    username: string,
    role: string,
    token: string,
    expiration: string
}

export default function useAuthentication(): SessionMechanisms {
    const [session, setSession] = React.useState<SessionData>(JSON.parse(localStorage.getItem(AUTH_ENTRY) ?? "{}"));
    const [loginFailed, setLoginFailed] = React.useState<boolean>(false);

    useEffect(() => {
        function handleStorageChange(event: StorageEvent) {
            if (event.key === AUTH_ENTRY) {
                setSession(JSON.parse(event.newValue ?? "{}"));
            }
        }

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return {
        sessionData: session,
        isLoggedIn: session.id !== undefined,
        hasLoginFailed: loginFailed,
        logOut: () => {
            setSession({} as SessionData);
            setLocalStorageString("{}");
        },
        logIn: (identifier: string, password: string) => {
            login({ username: identifier, password: password }).then((response) => {
                setSession(response.data);
                setLocalStorageString(JSON.stringify(response.data));
                setLocalStorageToken(response.data.token);
            }).catch((error) => {
                setLoginFailed(true);
            });
        }
    }
}