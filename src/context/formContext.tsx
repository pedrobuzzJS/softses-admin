"use client";

import dot from "dot-object";
import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useState
} from "react";
interface inputField {
    name: any;
    ref?: any;
    value?: any;
}
interface IFormProps {
    id?: unknown;
    formValues: {};
    handleSubmit: (callBack?: (args: unknown) => void) => void;
    clearFormValue: () => void;
    setFormFieldValue: ({ name, value }: inputField) => void;
    watch: () => void;
}

interface FormWithChildren extends PropsWithChildren {}

const FormContext = createContext<IFormProps>({} as IFormProps);

export const FormProvider: React.FC<FormWithChildren> = ({ children }) => {
    const [formValues, setFormValues] = useState<object>([]);

    let form: any;
    let fields: any[] = [];

    const setFormFieldValue = ({ name, value }: inputField) => {
        form = {
            ...form,
            [name]: value
        };
        if (!fields.includes(name)) fields.push(name);
    };

    const handleSubmit = async (callBack: (data: unknown) => Promise<void>) => {
        const data = await dot.object(form);
        setFormValues(data);
        await callBack(form);
        return true;
    };

    const clearFormValue = (callBack?: () => void) => {
        form = {};
        fields = [];
        setFormValues({});
        if (callBack) callBack();
        return true;
    };

    return (
        <FormContext.Provider
            value={{
                handleSubmit: handleSubmit,
                formValues: formValues,
                clearFormValue: clearFormValue,
                setFormFieldValue: setFormFieldValue
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

export function useForm() {
    return useContext(FormContext);
}