"use client";

import LineFluid from "@/components/GridSystem/LineFluid/LineFluid";
import { PropsWithChildren, useCallback, useState } from "react";
import {Cols} from "@/components/GridSystem/Grid/Grid";
import "./_inputWrapper.scss"

interface IInputWrapper extends PropsWithChildren {
    label: string;
    name: string;
    col?: Cols;
}

export default function InputWrapper({
    name,
    label,
    col = 3,
    children
}: IInputWrapper) {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    return (
        <LineFluid col={col}>
            <div
                className={`${"inputContainer"} ${
                    isFocused ? "inputFocus" : ""
                }`}
            >
                <div className={"formLabel"}>
                    <label className="inputLabel" htmlFor={name}>
                        <span className={"leftSpan"}>{label}</span>
                    </label>
                    <div className={"rightSpan"}></div>
                </div>
                <div
                    className={"formField"}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                >
                    {children}
                </div>
            </div>
        </LineFluid>
    );
}