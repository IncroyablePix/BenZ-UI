import React, {useEffect} from "react";

export default function useMouseHover(ref: React.RefObject<any>, callback: () => void) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && ref.current.contains(event.target)) {
                callback?.();
            }
        }

        document.addEventListener("mouseover", handleClickOutside);
        return () => {
            document.removeEventListener("mouseover", handleClickOutside);
        };

    }, [ref]);
}
