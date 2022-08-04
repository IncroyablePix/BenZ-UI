import usePages, {Page} from "../../hooks/usePages";
import {useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function HomePage() {
    const pages = usePages();

    return (
        <div className={"flex container mx-auto w-full min-h-screen"}>
            <div className={"m-auto flex flex-row flex-wrap items-center"}>
                {pages.map((page) => <PageLink
                    link={page.link}
                    icon={page.icon}
                    title={page.title}
                    description={page.description} />)}
            </div>
        </div>
    );
}

function PageLink(page: Page) {
    const navigate = useNavigate();

    return (
        <div
            className={"m-4 p-8 w-64 h-64 rounded-xl flex flex-col cursor-pointer hover:text-primary hover:bg-primary-dark border-transparent text-main-text p-4"}
            onClick={() => {
                navigate(page.link);
            }}>
            <span className={"flex flex-col m-auto"}>
                <FontAwesomeIcon icon={page.icon} className={"m-auto text-7xl"} />
                <span className={"text-center text-3xl"}>{page.title}</span>
            </span>
        </div>
    );
}