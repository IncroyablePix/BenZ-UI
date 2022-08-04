import clsx from "clsx";
import ButtonData from "./buttonData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

export default function CloseButton(props: ButtonData) {
    return (
        <button className={clsx("inline-flex text-center border-main-text bg-transparent text-main-text uppercase px-0.5 py-0.25 tracking-widest transition duration-500 hover:text-primary-dark", props.className)}
                type={props.type ?? "button"}
                onClick={props.onClick}>
            <FontAwesomeIcon icon={faClose} />
        </button>
    );
}