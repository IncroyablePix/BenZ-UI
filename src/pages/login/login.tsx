import {useState} from "react";
import TextInput from "../../components/textInput/textInput";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={"container mx-auto"}>
            <form className={"m-auto w-1/3 bg-dark-back p-12 rounded-xl"}>
                <TextInput name={"Username"} value={username} onChange={setUsername} />
                <TextInput name={"Password"} value={password} onChange={setPassword} type={"password"} />
            </form>
        </div>
    );
}