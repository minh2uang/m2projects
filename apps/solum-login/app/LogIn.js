"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const grey_1 = __importDefault(require("@mui/material/colors/grey"));
const TcTextField_1 = __importDefault(require("./forms/TcTextField"));
const useForm_1 = __importDefault(require("./forms/useForm"));
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validEmailList = ['example@example.com', 'example@solumclinic.com.au'];
const correctPassword = 'asdASD123!@#';
const LogIn = ({ onSignInSuccessfully }) => {
    const { register, handleSubmit, setFormError, formError, isSubmittable } = (0, useForm_1.default)({
        defaultValues: {
            email: '',
            password: ''
        },
        validates: {
            //This is mostly frontend validation (before the form is submitted to the server in a real world scenario)
            email: (email) => {
                let errMsg = '';
                if (email === undefined || email === '') {
                    errMsg = 'Email cannot be empty';
                }
                else if (!emailRegex.test(email)) {
                    errMsg = 'Your log in must be an email';
                }
                return errMsg;
            },
            password: (password) => {
                let errMsg = '';
                if (password === undefined || password === '') {
                    errMsg = 'Password cannot be empty';
                }
                else if (password.length < 8 || password.length > 16) {
                    errMsg = 'Password has to be between 8 and 16 characters long';
                }
                else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
                    errMsg =
                        'Password needs to contain at lease one number, on uppercase character and one lower case character.';
                }
                return errMsg;
            }
        }
    });
    // This handles erroneous scenarios that is typically handled by the server, such as user not existing or incorrect password
    const onLogIn = handleSubmit(async (toSubmit) => {
        if (!validEmailList.includes(toSubmit.email)) {
            setFormError("Your email doesn't exist in our system");
            return;
        }
        else if (correctPassword !== toSubmit.password) {
            setFormError('Your details are not correct');
            return;
        }
        onSignInSuccessfully(toSubmit.email);
    });
    return (<material_1.Grid container height={'100vh'} alignItems="center" sx={{ backgroundColor: grey_1.default[50] }}>
      <material_1.Grid size={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}/>
      <material_1.Grid size={{ xs: 10, sm: 10, md: 8, lg: 6, xl: 4 }} sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: grey_1.default[300]
        }}>
        <material_1.Box display="flex" flexDirection="column" gap={1} px={3} py={6}>
          <material_1.Box mb={3}>
            <material_1.Typography variant="h5">Solum Clinic</material_1.Typography>
            <material_1.Typography variant="subtitle1">Sign In to your account</material_1.Typography>
          </material_1.Box>
          <TcTextField_1.default {...register('email')} label="Email"/>
          <material_1.Box mb={1}/>
          <TcTextField_1.default {...register('password')} type="password" label="Password"/>
          <material_1.Box mb={2}/>
          {!!formError && (<material_1.Typography mb={2} color="error" variant="body2">
              {formError}
            </material_1.Typography>)}
          <material_1.Button onClick={onLogIn} variant="contained" disabled={!isSubmittable} // Greyed out if the form has not been touched or if any field is invalid
    >
            Log In
          </material_1.Button>
          <material_1.Box mb={1}/>
          <material_1.Link href="#">Forgot your password?</material_1.Link>
        </material_1.Box>
      </material_1.Grid>
      <material_1.Grid size={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4 }}/>
    </material_1.Grid>);
};
exports.default = LogIn;
