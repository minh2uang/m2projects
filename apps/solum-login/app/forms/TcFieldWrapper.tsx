import { Box, Tooltip, Typography } from '@mui/material'
import { JSX } from 'react'

type Props = {
  error?: string
  info?: string
  isDirty?: boolean
  children?: JSX.Element
}

const TcFieldWrapper = ({ children, error, info, isDirty }: Props) => {
  return (
    <Tooltip arrow title={info} placement="top">
      <Box>
        {children}
        {error && isDirty && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </Box>
    </Tooltip>
  )
}
export type TcFieldWrapper<T> = T & Props
export default TcFieldWrapper
