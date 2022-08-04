import React, {useEffect} from "react";
import {login} from "../api/authApi";

const THEME_ENTRY = "benz_theme";

export function setLocalStorageString(value: string) {
    localStorage.setItem(THEME_ENTRY, value);
    window.dispatchEvent(
        new StorageEvent("storage", { key: THEME_ENTRY, newValue: value })
    );
}

export function getLocalStorageTheme() {
    return localStorage.getItem(THEME_ENTRY);
}

interface ThemeMechanisms {
    setTheme: (theme: string) => void;
    theme: string;
}

export default function useTheme(): ThemeMechanisms {
    const [theme, setTheme] = React.useState<string>(getLocalStorageTheme() ?? "dark");

    useEffect(() => {
        setLocalStorageString(theme);
        document.getElementsByTagName("html")[0].setAttribute("data-theme", theme);
    }, [theme])

    useEffect(() => {
        function handleStorageChange(event: StorageEvent) {
            if (event.key === THEME_ENTRY) {
                document.getElementsByTagName("html")[0].setAttribute("data-theme", theme);
            }
        }

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return {
        theme: theme,
        setTheme
    }
}