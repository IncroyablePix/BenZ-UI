import clsx from "clsx";
import Select from "react-select/base";

export interface SelectBoxData {
    name: string;
    labelClassName?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    value: any;
    className?: string;
    onChange?: (value: any) => void;
    type?: "button" | "submit" | "reset";
    options: { value: any, label: string }[];
}

export default function SelectBox(props: SelectBoxData) {
    return (
        <div className={"flex flex-col"}>
            <label className={clsx("block text-sm font-medium leading-5 text-main-text", props.labelClassName)}>{props.name}</label>
            <select
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                required={props.required ?? false}
                disabled={props.disabled ?? false}
                className={clsx("border border-t-transparent border-x-transparent border-b-transparent border-b border-solid border-b-primary bg-dark-back text-main-text tracking-widest transition duration-500 hover:border hover:border-solid hover:border-primary focus:border-primary focus-visible:outline-none", props.className)}>
                {props.options.map((option) => (<option value={option.value}>{option.label}</option>))}
            </select>
        </div>
    );
}