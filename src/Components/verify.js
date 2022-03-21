import {useState} from 'react';
import Cookie from 'js-cookie'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Redirect} from 'react-router-dom'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

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
export default function Verify({userSignUp}) {
    const [data, setData] = useState({email: userSignUp.email});
    const [success, setSuccess] = useState(false);

    const signup = () => {
        transport.post('http://192.168.43.98:5000/signup', userSignUp).then(res => {
            Cookie.set('token', res.data.token)
            setSuccess(true)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        transport.post('http://192.168.43.98:5000/verifyotp', data).then(res => {
            if (res.status == 200) {
                signup();
            }
            else {
                console.log(res.data)
            }
        }).catch(err => {
            console.log(err)
        })
    };

    if (success) {
        <Redirect to='/' />
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
