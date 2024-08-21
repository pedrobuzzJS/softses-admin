"use client";

import { InputText, InputTextProps } from "primereact/inputtext";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "@/context/formContext";
import {Cols} from "@/components/GridSystem/Grid/Grid";
import InputWrapper from "@/components/Inputs/InputWraper/InputWrapper";

interface IInputTextProps extends InputTextProps {
    name: string;
    id?: string;
    label: string;
    placeholder?: string;
    initialData?: any;
    col?: Cols;
    notSet?: boolean;
}

export default function Input({
    name,
    label,
    initialData,
    col = 2,
    notSet = false,
    ...props
}: IInputTextProps) {
    const [inputValue, setInputValue] = useState<string | null>(initialData);

    const { setFormFieldValue } = useForm();

    useEffect(() => {
        if (notSet) return;
        setFormFieldValue({
            name: name,
            value: inputValue
        });
    }, [inputValue]);

    return (
        <InputWrapper label={label} name={name} col={col}>
            <InputText
                name={name}
                id={name}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                    width: "100%"
                }}
                value={inputValue}
                {...props}
            />
        </InputWrapper>
    );
}