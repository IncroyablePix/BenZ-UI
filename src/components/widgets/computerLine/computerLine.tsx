import {RevealLi} from "../reveal/reveal";
import Ransom from "../../../model/ransom";
import {CryptoType} from "../../../model/cryptoType";
import {CipherType} from "../../../model/cipherType";
import clsx from "clsx";

interface ComputerLineProps {
    odd: boolean,
    computer: Ransom;
}

export default function ComputerLine({computer, odd}: ComputerLineProps) {
    return (
        <RevealLi
            className={clsx("flex flex-col border-primary border-l-2 md:flex-row w-full p-4 justify-space hover:shadow-md duration-200 shadow-input/50", !odd && "bg-main-back", odd && "bg-dark-back")}
            id={computer.id}
            title={computer.description}>
            <span className="md:before:mr-4 before:text-primary w-6/12">{computer.name ?? computer.id}</span>
            <span className="w-2/12">{computer.cryptoAmount} {CryptoType[computer.cryptoType]}</span>
            <span className={"w-2/12"}>{CipherType[computer.cipherType]}</span>
            <span className={clsx(computer.paid ? "text-green-500" : "text-red-500", "w-2/12")}>{computer.paid ? "Paid" : "Unpaid"}</span>
            <span className="ml-auto">...</span>
        </RevealLi>
    );
}