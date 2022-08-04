import useAuthentication from "./authenticator";
import {faHome, faKey, faSackDollar, IconDefinition} from "@fortawesome/free-solid-svg-icons";

export interface Page {
    icon: IconDefinition;
    title: string;
    link: string;
    description: string;
}

export default function usePages() {
    const { isLoggedIn } = useAuthentication();

    if(!isLoggedIn) {
        return [
            {
                icon: faHome,
                title: "Home",
                link: "/",
                description: "Home page",
            },
            {
                icon: faSackDollar,
                title: "Ransoms",
                link: "/ransoms",
                description: "Ransoms",
            },
        ];
    }

    return [
        {
            icon: faKey,
            title: "Login",
            link: "/login",
            description: "Login to your account"
        }
    ];
}