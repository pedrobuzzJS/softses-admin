"use client"

// import {InputMask, InputMaskProps} from "primereact/inputmask";
import {useForm} from "@/context/formContext";
import {Cols} from "@/components/GridSystem/Grid/Grid";
import {useEffect, useState, useCallback, ReactNode} from "react";
import InputWrapper from "@/components/Inputs/InputWraper/InputWrapper";
import InputMask from "react-input-mask";

interface SInputMaskProps {
    name: string;
    col?: Cols;
    placeholder?: string;
    label: string;
    mask: string;
    initialData?: any;
}

export default function SInputMask({
    name,
    mask,
    label,
    col = 2,
    initialData,
    ...props
}: SInputMaskProps) {
    const [inputValue, setInputValue] = useState<any>(initialData);
    const { setFormFieldValue } = useForm();

    useEffect(() => {
        setFormFieldValue({
            name: name,
            value: inputValue
        });
    }, [inputValue, name, setFormFieldValue]);

    const handleOnChange = useCallback((e: any) => {
        return setInputValue(e.target.value);
    }, []);

    return (
        <InputWrapper label={label} name={name} col={col}>
            <InputMask
                id={name}
                name={name}
                value={inputValue}
                onChange={(e) => handleOnChange(e)}
                mask={mask}
                {...props}
                style={{
                    width: "100%"
                }}
            />
        </InputWrapper>
    );
}