import { Box, Button, Grid, Link, Typography } from '@mui/material'
import grey from '@mui/material/colors/grey'
import TcTextField from './forms/TcTextField'
import useForm from './forms/useForm'

interface LogInForm {
  email: string
  password: string
}

interface LogInProps {
  onSignInSuccessfully: (emailAddress: string) => void
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const validEmailList = ['example@example.com', 'example@solumclinic.com.au']
const correctPassword = 'asdASD123!@#'

const LogIn: React.FunctionComponent<LogInProps> = ({
  onSignInSuccessfully
}) => {
  const { register, handleSubmit, setFormError, formError, isSubmittable } =
    useForm<LogInForm>({
      defaultValues: {
        email: '',
        password: ''
      },
      validates: {
        //This is mostly frontend validation (before the form is submitted to the server in a real world scenario)
        email: (email) => {
          let errMsg = ''
          if (email === undefined || email === '') {
            errMsg = 'Email cannot be empty'
          } else if (!emailRegex.test(email)) {
            errMsg = 'Your log in must be an email'
          }
          return errMsg
        },
        password: (password) => {
          let errMsg = ''
          if (password === undefined || password === '') {
            errMsg = 'Password cannot be empty'
          } else if (password.length < 8 || password.length > 16) {
            errMsg = 'Password has to be between 8 and 16 characters long'
          } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
            errMsg =
              'Password needs to contain at lease one number, on uppercase character and one lower case character.'
          }
          return errMsg
        }
      }
    })

  // This handles erroneous scenarios that is typically handled by the server, such as user not existing or incorrect password
  const onLogIn = handleSubmit(async (toSubmit) => {
    if (!validEmailList.includes(toSubmit.email)) {
      setFormError("Your email doesn't exist in our system")
      return
    } else if (correctPassword !== toSubmit.password) {
      setFormError('Your details are not correct')
      return
    }
    onSignInSuccessfully(toSubmit.email)
  })

  return (
    <Grid
      container
      height={'100vh'}
      alignItems="center"
      sx={{ backgroundColor: grey[50] }}
    >
      <Grid size={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }} />
      <Grid
        size={{ xs: 10, sm: 10, md: 8, lg: 6, xl: 4 }}
        sx={{
          backgroundColor: 'white',
          borderRadius: 1,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: grey[300]
        }}
      >
        <Box display="flex" flexDirection="column" gap={1} px={3} py={6}>
          <Box mb={3}>
            <Typography variant="h5">Solum Clinic</Typography>
            <Typography variant="subtitle1">Sign In to your account</Typography>
          </Box>
          <TcTextField {...register('email')} label="Email" />
          <Box mb={1} />
          <TcTextField
            {...register('password')}
            type="password"
            label="Password"
          />
          <Box mb={2} />
          {!!formError && (
            <Typography mb={2} color="error" variant="body2">
              {formError}
            </Typography>
          )}
          <Button
            onClick={onLogIn}
            variant="contained"
            disabled={!isSubmittable} // Greyed out if the form has not been touched or if any field is invalid
          >
            Log In
          </Button>
          <Box mb={1} />
          <Link href="#">Forgot your password?</Link>
        </Box>
      </Grid>
      <Grid size={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }} />
    </Grid>
  )
}

export default LogIn
