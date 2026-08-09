/// <reference types="react" />
export default interface TcFieldProps<Value, Required extends boolean = false> {
    label: string | React.ReactNode;
    onChange: (newValue: Value) => void;
    value: Required extends true ? Value : Value | undefined;
    placeholder?: string;
    error?: string;
    isDirty?: boolean;
    children?: JSX.Element;
}
//# sourceMappingURL=TcFieldProps.d.ts.map