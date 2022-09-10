import {RevealLi} from "../reveal/reveal";
import Ransom from "../../../model/ransom";
import {CryptoType, cryptoTypeFromString} from "../../../model/cryptoType";
import {CipherType, cipherTypeFromString} from "../../../model/cipherType";
import clsx from "clsx";
import {FormEvent, useState} from "react";
import {useAllCiphers} from "../../../api/cipherApi";
import {useAllCryptos} from "../../../api/cryptoApi";
import {useUpdateRansom} from "../../../api/ransomApi";
import TextInput from "../../textInput/textInput";
import {isExtension, isFloat} from "../../../helper/onlyNumber";
import SelectBox from "../../selectBox/selectBox";
import FrameButton from "../../button/frameButton";
import Modal from "../../modal/modal";

interface ComputerLineProps {
    odd: boolean,
    computer: Ransom;
}

export default function ComputerLine({computer, odd}: ComputerLineProps) {
    const [isExpanded, setExpanded] = useState<boolean>(false);

    return (
        <RevealLi
            className={clsx("flex flex-col border-primary border-l-2 md:flex-row w-full p-4 justify-space hover:shadow-md duration-200 shadow-input/50", !odd && "bg-main-back", odd && "bg-dark-back")}
            id={computer.id}
            title={computer.description}>
            <span className="md:before:mr-4 before:text-primary w-6/12">{computer.name ?? computer.id}</span>
            <span className="w-2/12">{computer.cryptoAmount} {CryptoType[computer.cryptoType]}</span>
            <span className={"w-2/12"}>{CipherType[computer.cipherType]}</span>
            <span className={clsx(computer.paid ? "text-green-500" : "text-red-500", "w-2/12")}>{computer.paid ? "Paid" : "Unpaid"}</span>
            <span className="ml-auto cursor-pointer" onClick={() => setExpanded(true)}>...</span>
            <Modal
                show={isExpanded}
                handleClose={() => setExpanded(false)}
                title={"Ransom details"}
                size={"m"}>

                <RansomDetails onEdited={() => setExpanded(false)} ransom={computer} />
            </Modal>
        </RevealLi>
    );
}

interface RansomDetailsProps {
    /* onChange: (ransom: Ransom) => void; */
    onEdited: () => void;
    ransom: Ransom;
}

function RansomDetails({ ransom, onEdited }: RansomDetailsProps) {
    const [cryptoAmount, setCryptoAmount] = useState<string>(ransom.cryptoAmount.toString());
    const [maxEncrypt, setMaxEncrypt] = useState<number>(ransom.maxEncrypt);
    const [cipherType, setCipherType] = useState<string>(CipherType[ransom.cipherType]);
    const [message, setMessage] = useState<string>(ransom.message);
    const [description, setDescription] = useState<string>(ransom.description);
    const [name, setName] = useState<string>(ransom.name ?? "");
    const [cryptoType, setCryptoType] = useState<string>(CryptoType[ransom.cryptoType]);
    const [extension, setExtension] = useState<string>(ransom.extension);
    const ransomId = ransom.id;

    const { data: cipherData } = useAllCiphers();
    const { data: cryptoData } = useAllCryptos();

    const updating = useUpdateRansom({
        onSuccess: onEdited,
    });

    const updateRansom = (evt: FormEvent) => {
        evt.preventDefault();
        const newRansom = new Ransom();
        newRansom.cryptoAmount = Number(cryptoAmount);
        newRansom.cipherType = cipherTypeFromString(cipherType);
        newRansom.message = message;
        newRansom.description = description;
        newRansom.name = name;
        newRansom.cryptoType = cryptoTypeFromString(cryptoType);
        newRansom.maxEncrypt = maxEncrypt;
        newRansom.extension = extension;
        newRansom.id = ransomId;

        updating.mutate(newRansom);
    };

    return (
        <form onSubmit={updateRansom} className={"flex flex-col"}>
            <div className={"flex flex-row"}>
                <div className={"flex flex-col mr-2 w-1/3"}>
                    <div className={"flex flex-row"}>
                        <TextInput name={"Ransom"} value={cryptoAmount.toString()} onChange={setCryptoAmount} type={"text"} valueHook={isFloat} />
                        <SelectBox name={"Crypto"} value={cryptoType} options={cryptoData?.data?.map((c) => ({value: c.id, label: c.name})) ?? []} onChange={setCryptoType} />
                    </div>
                    <SelectBox name={"Cipher type"} value={cipherType} options={cipherData?.data?.map((c) => ({value: c.id, label: c.name})) ?? []} onChange={setCipherType} />
                </div>
                <div className={"flex flex-col ml-2 w-1/3"}>
                    <TextInput name={"Name"} value={name} onChange={setName} />
                    <TextInput name={"Description"} value={description} onChange={setDescription} />
                    <TextInput name={"Message"} value={message} onChange={setMessage} />
                    <TextInput name={"Extension"} value={`.${extension.replace(".", "")}`} onChange={setExtension} valueHook={isExtension} />
                </div>
            </div>
            <FrameButton text={"Update"} type={"submit"} className={"ml-auto mt-8"} />
        </form>
    );
}