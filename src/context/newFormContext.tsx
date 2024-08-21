"use client"

import dot from "dot-object";
import {createContext, PropsWithChildren, useContext, useState} from "react";

interface InputField<ValueType = string> {
    name: string;
    value: ValueType;
}

interface IFormProps<T, Type> {
    formId?: string;
    formValues: [];
    activeForm: false;
    handleSubmit: (callBack?: (args: unknown) => void) => void;
    setFormFieldValue: ({ name, value }: InputField<Type>) => void;
}

interface SGlobalFormState<T, Type> {
    forms: IFormProps<T, Type>;
    getForm: (formId: string) => {};
    setForm: (form: object) => void;
    clearForm: (formId: string) => void;
}

export function NewFormContext() {
    return (
        <></>
    );
}