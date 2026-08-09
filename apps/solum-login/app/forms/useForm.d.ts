export type DeepReadOnly<T> = {
    readonly [key in keyof T]: T[key] extends () => void ? DeepReadOnly<T[key]> : T[key];
};
export type Stringify<T> = {
    [key in keyof T]: string;
};
export type Booleanise<T> = {
    [key in keyof T]: boolean;
};
interface UseFormParamters<Form> {
    defaultValues?: Partial<Form>;
    initialiser?: () => Promise<Form>;
    validates?: {
        [key in keyof Form]: (value: Form[key] | undefined, formValues: Partial<Form>) => string | undefined;
    };
    submissionSuccessMessage?: string;
}
declare const useForm: <Form>({ defaultValues, validates, initialiser }: UseFormParamters<Form>) => {
    formValues: DeepReadOnly<Form>;
    errors: DeepReadOnly<Stringify<Form>>;
    isTouchedValues: DeepReadOnly<Booleanise<Form>>;
    setValue: <Key extends keyof Form>(key: Key, newValue: Form[Key]) => void;
    setValues: (newValues: Form) => void;
    defaultValues: DeepReadOnly<Form>;
    setError: (key: keyof Form, newValue?: string) => void;
    register: <Key_1 extends keyof Form>(key: Key_1) => {
        value: Partial<Form>[Key_1];
        label: Key_1;
        error: Partial<Stringify<Form>>[Key_1];
        isDirty: Partial<Booleanise<Form>>[Key_1];
        onChange: (newValue: Form[Key_1]) => void;
        onBlur: () => void;
        onFocus: () => void;
    };
    handleSubmit: (onSubmit: (toSubmit: DeepReadOnly<Form>) => Promise<void>) => () => Promise<void>;
    isSubmittable: boolean;
    isSubmitting: boolean;
    isValid: boolean;
    clearForm: () => void;
    formError: string;
    setFormError: import("react").Dispatch<import("react").SetStateAction<string>>;
};
export default useForm;
//# sourceMappingURL=useForm.d.ts.map