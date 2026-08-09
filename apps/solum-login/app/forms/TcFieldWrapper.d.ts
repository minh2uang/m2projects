import { JSX } from 'react';
type Props = {
    error?: string;
    info?: string;
    isDirty?: boolean;
    children?: JSX.Element;
};
declare const TcFieldWrapper: ({ children, error, info, isDirty }: Props) => import("react").JSX.Element;
export type TcFieldWrapper<T> = T & Props;
export default TcFieldWrapper;
//# sourceMappingURL=TcFieldWrapper.d.ts.map