import clsx from "clsx";
import ButtonData from "./buttonData";

export default function FrameButton(props: ButtonData) {
    return (
        <button className={clsx("inline-flex border border-solid text-center border-main-text bg-transparent text-main-text uppercase px-2 py-0.5 font-bold tracking-widest transition duration-500 hover:text-primary-dark hover:border hover:border-solid hover:border-primary-dark", props.className)}
                type={props.type ?? "button"}
                onClick={props.onClick}>
            <span>{props.text}</span>
        </button>
    );
}