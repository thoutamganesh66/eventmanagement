import {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import axios from 'axios'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Verify from './verify'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" target="_blank" href="https://sgc.turntbloke.me/">
                SGC RGUKT Basar
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
export default function SignUp({error, setError, setSuccess}) {
    const [userSignUp, setUserSignUp] = useState({})
    const [confirmPassword, setConfirmPassword] = useState();
    const [sentMail, setSentMail] = useState(false);

    const handleSubmit = (event) => {
        console.log(confirmPassword, userSignUp)
        console.log(process.env.REACT_APP_URL)
        event.preventDefault();
        if (confirmPassword == userSignUp.password) {
            transport.post(`${REACT_APP_API_URL}/sendmail`, {email: userSignUp.email, shouldExist: false}).then(res => {
                if (res.status != 200) {
                    throw new Error(res.data)
                } else {
                    setSentMail(true)
                    setSuccess(`otp successfully sent to ${userSignUp.email}`)
                    setError(null)
                    console.log(res.data)
                }
            }).catch(err => {
                setError(err.message)
                setSuccess(null)
                console.log(err)
            })
        }
        else {
            console.log('password mismatch')
            setError('password mismatch')
        }
    };
    if (sentMail) {

        return <Verify userSignUp={userSignUp} error={error} setError={setError} setSuccess={setSuccess} />
    }
    return (
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
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    placeholder="Enter your name"
                                    onChange={(e) => setUserSignUp({...userSignUp, name: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setUserSignUp({...userSignUp, email: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={(e) => setUserSignUp({...userSignUp, password: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="confirm password"
                                    label="Confirm password"
                                    name="confirm password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Sign up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <RouterLink to='/login'>
                                    <Link variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </RouterLink >
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}} />
            </Container>
        </ThemeProvider>
    );
}
