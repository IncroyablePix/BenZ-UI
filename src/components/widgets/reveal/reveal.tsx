import React, { useEffect, useRef, useState } from "react";
import "./reveal.css";

interface RevealLiProps {
    id: string;
    className?: string;
    children?: React.ReactNode;
    title?: string;
}

function RevealLi(props: RevealLiProps) {
    const [revealed, setRevealed] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.intersectionRatio > .1) {
                    setRevealed(true);
                    if(ref?.current) {
                        observer.unobserve(ref.current);
                    }
                }
            })
        }, {
            root: null,
            rootMargin: "0px",
            threshold: .1
        });

        if(ref?.current) {
            observer.observe(ref?.current);
        }
    }, []);

    return <li
        key={props.id ?? "0"}
        title={props.title}
        className={`${props.className ?? ""} reveal-base ${revealed ? "revealed" : "reveal"}`}
        ref={ref}>
        {props.children}
    </li>
}

function RevealDiv(props: RevealLiProps) {
    const [revealed, setRevealed] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.intersectionRatio > .1) {
                    setRevealed(true);

                    if(ref?.current) {
                        observer.unobserve(ref.current);
                    }
                }
            })
        }, {
            root: null,
            rootMargin: "0px",
            threshold: .1
        });

        if(ref?.current) {
            observer.observe(ref.current);
        }
    }, []);

    return <div className={`${props.className ?? ""} reveal-base ${revealed ? "revealed" : "reveal"}`} ref={ref}>{props.children}</div>
}

export {RevealLi, RevealDiv};