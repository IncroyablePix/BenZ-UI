import {useRef, useState} from "react";
import useOutsideClicker from "../../hooks/outsideClicker";
import clsx from "clsx";
import {Outlet, useLocation, useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSkull} from "@fortawesome/free-solid-svg-icons";
import usePages, {Page} from "../../hooks/usePages";

export default function SideMenu() {
    const [deployed, setDeployed] = useState(false);
    const navRef = useRef(null);
    useOutsideClicker(navRef, () => setDeployed(false));
    const pages = usePages();

    return (
        <>
            <div ref={navRef} className={clsx("flex flex-col sticky top-0 left-0 h-screen bg-dark-back w-32", deployed && "w-64")}>
                <h1 className={"flex flex-row h-24 bg-primary"}>
                    <span className={"flex flex-col m-auto text-main-text"}>
                        <FontAwesomeIcon icon={faSkull} className={"mx-auto text-3xl"} />
                        <p className={"text-center text-2xl"}>BenZ</p>
                    </span>
                </h1>
                <div className={"flex flex-row h-16"}>

                </div>
                {pages.map(page => <PageLink icon={page.icon} title={page.title} link={page.link} description={page.description} />)}
            </div>
            <Outlet/>
        </>);
}

function PageLink(page: Page) {
    const location = useLocation();
    const navigate = useNavigate();
    const activePage = location.pathname === page.link;

    return (
        <div
            className={
                clsx(
                    "flex flex-col h-24 cursor-pointer hover:text-primary hover:bg-main-back border-r-4 hover:border-r-primary",
                    activePage && "border-r-primary text-primary-dark border-y-1 border-y-main-back",
                    !activePage && "border-transparent text-main-text"
                )
            }
            onClick={() => {
                navigate(page.link);
            }}>
            <span className={"flex flex-col m-auto"}>
                <FontAwesomeIcon icon={page.icon} className={"m-auto text-2xl"} />
                <span className={"text-center"}>{page.title}</span>
            </span>
        </div>
    );
}