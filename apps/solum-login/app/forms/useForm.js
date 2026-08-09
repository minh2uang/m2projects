"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useForm = ({ defaultValues, validates, initialiser }) => {
    // any field can be undefined technically ... validates will handle validation
    const [formValues, setFormValues] = (0, react_1.useState)(defaultValues || {});
    const defaultValuesRef = (0, react_1.useRef)(defaultValues);
    (0, react_1.useEffect)(() => {
        if (initialiser && !defaultValuesRef.current) {
            const initialiseFormValues = async () => {
                const values = await initialiser();
                setFormValues(values);
                defaultValuesRef.current = values;
            };
            void initialiseFormValues();
        }
    }, [initialiser]);
    const [formError, setFormError] = (0, react_1.useState)('');
    const [errors, setErrors] = (0, react_1.useState)({});
    const [isTouchedValues, setIsTouchedValues] = (0, react_1.useState)({});
    const [isSubmitting, setIsSubmiting] = (0, react_1.useState)(false);
    const setValue = (0, react_1.useCallback)((key, newValue) => {
        setFormValues((cur) => ({ ...cur, [key]: newValue })), setFormError('');
    }, []);
    const setValues = (0, react_1.useCallback)((newValues) => {
        setFormValues(newValues), setFormError('');
    }, []);
    const setError = (0, react_1.useCallback)((key, newValue) => setErrors((cur) => ({ ...cur, [key]: newValue })), []);
    const setTouched = (0, react_1.useCallback)((key, newValue) => setIsTouchedValues((cur) => ({ ...cur, [key]: newValue })), []);
    const clearForm = (0, react_1.useCallback)(() => setFormValues(defaultValues || {}), [defaultValues]);
    const register = (0, react_1.useCallback)((key) => {
        const value = formValues && formValues[key];
        const validate = validates && validates[key];
        return {
            value,
            label: key,
            error: errors[key],
            isDirty: isTouchedValues[key],
            onChange: (newValue) => {
                setValue(key, newValue);
                if (validate) {
                    const errorMsg = validate(newValue, formValues);
                    setError(key, errorMsg);
                }
            },
            onBlur: () => {
                if (validate) {
                    const errorMsg = validate(value, formValues);
                    setError(key, errorMsg);
                }
            },
            onFocus: () => {
                setTouched(key, true);
            }
        };
    }, [
        errors,
        formValues,
        isTouchedValues,
        setError,
        setTouched,
        setValue,
        validates
    ]);
    const isFormTouched = Object.values(isTouchedValues).some((a) => a);
    const isValid = (0, react_1.useMemo)(() => Object.keys(validates || {})
        .map((key) => {
        setTouched(key, true);
        const value = formValues[key];
        const validate = !!validates && validates[key];
        const errMsg = !!validate && validate(value, formValues);
        return errMsg;
    })
        .filter((errMsg) => !!errMsg).length === 0, [JSON.stringify(formValues), JSON.stringify(isTouchedValues)]);
    const handleSubmit = (onSubmit) => async () => {
        try {
            setIsSubmiting(true);
            await onSubmit(formValues);
        }
        catch (error) {
        }
        finally {
            setIsSubmiting(false);
        }
    };
    const isSubmittable = isFormTouched && !isSubmitting && isValid;
    return {
        formValues: formValues,
        errors: errors,
        isTouchedValues: isTouchedValues,
        setValue,
        setValues,
        defaultValues: defaultValuesRef.current,
        setError,
        register,
        handleSubmit,
        isSubmittable,
        isSubmitting,
        isValid,
        clearForm,
        formError,
        setFormError
    };
};
exports.default = useForm;
