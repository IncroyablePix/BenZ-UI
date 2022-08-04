export default interface ButtonData {
    text: string;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}