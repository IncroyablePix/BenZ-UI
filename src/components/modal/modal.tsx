import React from "react";
import clsx from "clsx";
import "./modal.css";
import CloseButton from "../button/closeButton";
import FrameButton from "../button/frameButton";

interface ModalContent {
    title: string;
    handleClose: () => void;
    show: boolean;
    children: JSX.Element[] | JSX.Element;
    size: "xs" | "s" | "m" | "l" | "xl";
    buttons?: JSX.Element[];
}

export default function Modal(props: ModalContent) {
    let size: string;

    switch(props.size) {
        case "xs":
            size = "24rem";
            break;
        case "s":
            size = "40rem";
            break;
        case "m":
            size = "56rem";
            break;
        case "l":
            size = "72rem";
            break;
        case "xl":
            size = "96rem";
            break;
    }

    return (<div className={clsx("fixed top-0 left-0 w-full h-full bg-darkened text-main-text over-everything m-0", props.show ? "block" : "hidden")}>
        <section className="flex flex-col rounded-xl fixed bg-main-back top-8 left-2/4 m-0 modal-window max-w-screen" style={{transform: "translate(-50%,0%)", width: `min(${size}, 100vw)`, maxWidth: "100vw"}}>
            <span className={"flex flex-row p-4 bg-dark-back rounded-t-xl"}>
                <h2 className={"text-2xl"}>{props.title}</h2>
                <CloseButton className={"ml-auto mb-auto text-xl tracking-widest"} onClick={props.handleClose} text={"X"} />
            </span>
            <hr/>
            <div className="my-4 p-4">
                {props.children}
            </div>
            {(props?.buttons?.length ?? 0) > 0 &&
                <div className={"flex flex-row ml-auto p-4 "}>
                    <hr className="mb-2"/>
                    {props?.buttons?.map((button, index) => (button))}
                </div>
            }
        </section>
    </div>);
}