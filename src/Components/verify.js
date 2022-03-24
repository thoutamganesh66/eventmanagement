import {useState} from 'react';
import Cookie from 'js-cookie'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
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
export default function Verify({userSignUp, setError, setSuccess}) {
    const [data, setData] = useState({email: userSignUp.email});
    const [created, setCreated] = useState(false);
    const signup = () => {

        transport.post(`${REACT_APP_API_URL}/signup`, userSignUp).then(res => {
            if (res.status != 200) {
                throw new Error(res.data);
            }
            Cookie.set('token', res.data.token)
            localStorage.setItem('token',res.data.token)
            setSuccess('Succesfully created account!')
            setError(null)
            setCreated(true)
        }).catch(err => {
            setError(err.message)
            setSuccess(null)
            console.log(err)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        transport.post(`${REACT_APP_API_URL}/verifyotp`, data).then(res => {
            if (res.status == 200) {
                signup();
            } else {
                throw new Error(res.data)
            }
        }).catch(err => {
            console.log(err)
            setError(err.message)
            setSuccess(null)
        })
    };
    if (created) return <Redirect to='' />
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="otp"
                                    label="OTP"
                                    type="text"
                                    placeholder=""
                                    onChange={(e) => setData({...data, otp: e.target.value})}
                                    autoFocus
                                    id="text"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            verify
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}} />
            </Container>
        </ThemeProvider>
    );
}
