// import { create } from 'zustand'
//
// interface inputField<T> {
//     name: string;
//     value?: T;
// }
// interface IFormProps<T> {
//     formId?: string;
//     formValues: T[];
//     activeForm: false;
//     handleSubmit: (callBack?: (args: unknown) => void) => void;
//     setFormFieldValue: ({ name, value }: inputField<T>) => void;
// }
//
// interface SGlobalFormState<T> {
//     forms: IFormProps<T[]>[];
//     getForm: (formId: string) => {};
//     setForm: (form: object) => void;
//     clearForm: (formId: string) => void;
// }
//
// const useFormStore = create<SGlobalFormState>((set) => {
//
// });
//
// export default useFormStore;