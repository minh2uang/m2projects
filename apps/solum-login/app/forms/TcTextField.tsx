import { TextField } from '@mui/material'
import FieldWrapper, { TcFieldWrapper } from './TcFieldWrapper'
import TcFieldProps from './TcFieldProps'

export interface TcTextFieldProps extends TcFieldWrapper<TcFieldProps<string>> {
  type?: string
  rows?: number
}

const TcTextField = ({
  onChange,
  error,
  isDirty,
  value,
  info,
  ...props
}: TcTextFieldProps) => {
  return (
    <FieldWrapper isDirty={isDirty} error={error} info={info}>
      <TextField
        fullWidth
        size="small"
        {...props}
        InputLabelProps={{ shrink: true }}
        value={value || ''}
        onChange={({ target }) => onChange(target.value)}
      />
    </FieldWrapper>
  )
}

export default TcTextField
