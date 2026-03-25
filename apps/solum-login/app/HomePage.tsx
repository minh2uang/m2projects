import { Box, Button, Typography } from '@mui/material'

interface IProps {
  signedInEmailAddress: string
  signOut: () => void
}
const HomePage: React.FunctionComponent<IProps> = ({
  signedInEmailAddress,
  signOut
}) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      height="100vh"
    >
      <Typography variant="h5">{`Welcome, ${signedInEmailAddress}`}</Typography>
      <Button fullWidth={false} onClick={signOut}>
        Log Out
      </Button>
    </Box>
  )
}

export default HomePage
