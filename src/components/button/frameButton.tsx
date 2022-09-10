import clsx from "clsx";
import ButtonData from "./buttonData";

export default function FrameButton(props: ButtonData) {
    return (
        <button className={clsx("inline-flex border border-solid text-center border-main-text bg-main-text-light text-button uppercase px-2 min-w-button font-semibold tracking-wide tracking-widest transition duration-500 hover:text-primary hover:border hover:border-solid hover:border-primary-dark text-sm", props.className)}
                type={props.type ?? "button"}
                onClick={props.onClick}>
            <span className={"m-auto"}>{props.text}</span>
        </button>
    );
}