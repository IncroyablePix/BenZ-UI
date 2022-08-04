import clsx from "clsx";
import {useState} from "react";

interface TextInputData {
    name: string,
    value: string,
    onChange: (value: string) => void,
    valueHook?: (value: string) => string | null,
    className?: string,
    labelClassName?: string,
    placeholder?: string,
    type?: string,
    required?: boolean,
    disabled?: boolean,
    maxLength?: number,
}

export default function TextInput(props: TextInputData) {
    const [lastValue, setLastValue] = useState(props.value);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        if (props.maxLength &&
            event.target.value.length > props.maxLength) {
            return;
        }

        if(props.valueHook) {
            const val = props.valueHook(event.target.value);
            if(val === null) {
                setLastValue(event.target.value = "");
            }
            else {
                setLastValue(event.target.value = val);
            }
        }

        setLastValue(event.target.value);
        props.onChange(event.target.value);
    };

    return (
        <div className={"flex flex-col"}>
            <label className={clsx("block text-sm font-medium leading-5 text-main-text", props.labelClassName)}>{props.name}</label>
            <input
                name={props.name}
                value={props.value}
                onChange={onChange}
                placeholder={props.placeholder}
                type={props.type ?? "text"}
                required={props.required ?? false}
                disabled={props.disabled ?? false}
                className={clsx("border border-t-transparent border-x-transparent border-b-transparent border-b border-solid border-b-primary bg-dark-back text-main-text tracking-widest transition duration-500 hover:border hover:border-solid hover:border-primary focus:border-primary focus-visible:outline-none", props.className)} />
        </div>
    );
}