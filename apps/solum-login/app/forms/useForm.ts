import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export type DeepReadOnly<T> = {
  readonly [key in keyof T]: T[key] extends () => void
    ? DeepReadOnly<T[key]>
    : T[key]
}

export type Stringify<T> = { [key in keyof T]: string }

export type Booleanise<T> = { [key in keyof T]: boolean }

interface UseFormParamters<Form> {
  defaultValues?: Partial<Form>
  initialiser?: () => Promise<Form>
  validates?: {
    [key in keyof Form]: (
      value: Form[key] | undefined,
      formValues: Partial<Form>
    ) => string | undefined
  }
  submissionSuccessMessage?: string
}
const useForm = <Form>({
  defaultValues,
  validates,
  initialiser
}: UseFormParamters<Form>) => {
  type ReadonlyForm = DeepReadOnly<Form>
  type StringifiedForm = Stringify<Form>
  type BooleanisedForm = Booleanise<Form>
  type ReadonlyStringifiedForm = DeepReadOnly<StringifiedForm>
  type ReadonlyBooleanisedForm = DeepReadOnly<BooleanisedForm>
  type FormKey = keyof Form
  type FormValue = Form[FormKey] | undefined
  // any field can be undefined technically ... validates will handle validation
  const [formValues, setFormValues] = useState<Partial<Form>>(
    defaultValues || {}
  )
  const defaultValuesRef = useRef(defaultValues)
  useEffect(() => {
    if (initialiser && !defaultValuesRef.current) {
      const initialiseFormValues = async () => {
        const values = await initialiser()
        setFormValues(values)
        defaultValuesRef.current = values
      }
      void initialiseFormValues()
    }
  }, [initialiser])
  const [formError, setFormError] = useState<string>('')
  const [errors, setErrors] = useState<Partial<StringifiedForm>>({})
  const [isTouchedValues, setIsTouchedValues] = useState<
    Partial<BooleanisedForm>
  >({})
  const [isSubmitting, setIsSubmiting] = useState<boolean>(false)

  const setValue = useCallback(
    <Key extends keyof Form>(key: Key, newValue: Form[Key]) => {
      setFormValues((cur) => ({ ...cur, [key]: newValue })), setFormError('')
    },
    []
  )

  const setValues = useCallback((newValues: Form) => {
    setFormValues(newValues), setFormError('')
  }, [])

  const setError = useCallback(
    (key: keyof Form, newValue?: string) =>
      setErrors((cur) => ({ ...cur, [key]: newValue })),
    []
  )

  const setTouched = useCallback(
    (key: keyof Form, newValue: boolean) =>
      setIsTouchedValues((cur) => ({ ...cur, [key]: newValue })),
    []
  )

  const clearForm = useCallback(
    () => setFormValues(defaultValues || {}),
    [defaultValues]
  )

  const register = useCallback(
    <Key extends keyof Form>(key: Key) => {
      const value = formValues && formValues[key]
      const validate = validates && validates[key]

      return {
        value,
        label: key,
        error: errors[key],
        isDirty: isTouchedValues[key],
        onChange: (newValue: Form[typeof key]) => {
          setValue(key, newValue)
          if (validate) {
            const errorMsg = validate(newValue, formValues)
            setError(key, errorMsg)
          }
        },
        onBlur: () => {
          if (validate) {
            const errorMsg = validate(value, formValues)
            setError(key, errorMsg)
          }
        },
        onFocus: () => {
          setTouched(key, true)
        }
      }
    },
    [
      errors,
      formValues,
      isTouchedValues,
      setError,
      setTouched,
      setValue,
      validates
    ]
  )

  const isFormTouched = Object.values(isTouchedValues).some((a) => a)

  const isValid = useMemo(
    () =>
      Object.keys(validates || {})
        .map((key) => {
          setTouched(key as FormKey, true)
          const value = formValues[key as FormKey] as FormValue
          const validate = !!validates && validates[key as FormKey]
          const errMsg = !!validate && validate(value as FormValue, formValues)
          return errMsg
        })
        .filter((errMsg) => !!errMsg).length === 0,

    [JSON.stringify(formValues), JSON.stringify(isTouchedValues)]
  )

  const handleSubmit =
    (onSubmit: (toSubmit: ReadonlyForm) => Promise<void>) => async () => {
      try {
        setIsSubmiting(true)
        await onSubmit(formValues as ReadonlyForm)
      } catch (error) {
      } finally {
        setIsSubmiting(false)
      }
    }

  const isSubmittable = isFormTouched && !isSubmitting && isValid
  return {
    formValues: formValues as ReadonlyForm,
    errors: errors as ReadonlyStringifiedForm,
    isTouchedValues: isTouchedValues as ReadonlyBooleanisedForm,
    setValue,
    setValues,
    defaultValues: defaultValuesRef.current as ReadonlyForm,
    setError,
    register,
    handleSubmit,
    isSubmittable,
    isSubmitting,
    isValid,
    clearForm,
    formError,
    setFormError
  }
}

export default useForm
