
import {Redirect} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import {useState} from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import axios from 'axios'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import Footer from './Footer';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const transport = axios.create({
    withCredentials: true,
})
export default function ForgotPassword({setError, setSuccess}) {
    const [userDetails, setUserDetails] = useState({});
    const [otp, setOtp] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [redirect, setRedirect] = useState(false);
    const [buttons, setButtons] = useState({sendButton: false, verifyButton: true, submitButton: true});
    const sendotp = (e) => {
        console.log(userDetails)
        setButtons({...buttons, sendButton: true})
        e.preventDefault();
        transport.post(`${process.env.REACT_APP_API_URL}/sendmail`, {email: userDetails.email, shouldExist: true}).then((res) => {
            if (res.status != 200) {
                throw new Error(res.data);
            }
            setSuccess("sent mail")
            setError(null)
            setButtons({...buttons, verifyButton: false})
        }).catch(err => {
            setError(err.message)
            setButtons({...buttons, sendButton: false})
            setSuccess(null)
            console.log(err)
        })
    }

    const otpverify = (e) => {
        setButtons({...buttons, verifyButton: true})
        console.log(otp)
        e.preventDefault();
        transport.post(`${process.env.REACT_APP_API_URL}/verifyotp`, {otp: otp, email: userDetails.email}).then((res) => {
            if (res.status != 200) {
                throw new Error(res.data);
            }
            setSuccess("otp verified")
            setError(null)
            setButtons({...buttons, submitButton: false})
        }).catch(err => {
            setError(err.message)
            setSuccess(null)
            console.log(err)
        })
    }
    const changepassword = (e) => {
        console.log(userDetails)
        setButtons({...buttons, submitButton: true})
        e.preventDefault();
        if (confirmpassword == userDetails.password) {

            transport.post(`${process.env.REACT_APP_API_URL}/changepassword`, {...userDetails, secret: "asdasdknafnalkdfsdnfusdkljsfs"}).then((res) => {
                if (res.status != 200) {
                    throw new Error(res.data);
                }
                setSuccess("passsword reset successfully!")
                setError(null)
                setRedirect(true)
            }).catch(err => {
                setError(err.message)
                setSuccess(null)
                console.log(err)
            })
        }
        else {
            setError("passsword mismatched")
            setSuccess(null)
        }
    }
    if (redirect) return <Redirect to='/' />
    return (
        <>
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e) => {
                                setUserDetails({...userDetails, email: e.target.value});
                                setButtons({...buttons, sendButton: false, verifyButton: true, submitButton: true})
                            }}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />

                        <Button
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={e => {sendotp(e)}}
                            disabled={buttons.sendButton}
                        >
                            Send otp
                        </Button>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={(e) => {setOtp(e.target.value)}}
                            name="otp"
                            label="OTP"
                            type="text"
                            id="password"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={(e) => otpverify(e)}
                            disabled={buttons.verifyButton}
                        >
                            verify otp
                        </Button>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="New passoword"
                            label="New password"
                            type="password"
                            onChange={(e) => {
                                setUserDetails({...userDetails, password: e.target.value});
                                setButtons({...buttons, submitButton: false})
                            }}
                            id="password"
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Confirm password"
                            label="Confirm password"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setButtons({...buttons, submitButton: false})
                            }}
                            type="password"
                            id="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            className="sign-in"
                            onClick={(e) => changepassword(e)}
                            variant="contained"
                            disabled={buttons.submitButton}
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}} />
            </Container>
        </ThemeProvider>
        {Footer}
        <Footer/>
        </>
    );
}
