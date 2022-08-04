import "./loading.css";
import React from 'react';
import clsx from "clsx";

interface LoadingProps {
    className?: string;
}

export default function Loading(props: LoadingProps) {
    return <div
        className={clsx("loading-circle", props.className)}/>;
}