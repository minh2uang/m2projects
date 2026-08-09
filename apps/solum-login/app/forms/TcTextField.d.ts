/// <reference types="react" />
import { TcFieldWrapper } from './TcFieldWrapper';
import TcFieldProps from './TcFieldProps';
export interface TcTextFieldProps extends TcFieldWrapper<TcFieldProps<string>> {
    type?: string;
    rows?: number;
}
declare const TcTextField: ({ onChange, error, isDirty, value, info, ...props }: TcTextFieldProps) => import("react").JSX.Element;
export default TcTextField;
//# sourceMappingURL=TcTextField.d.ts.map