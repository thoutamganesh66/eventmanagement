import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import Link from '@mui/material/Link';
import {Link as RouteLink} from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Cookie from 'js-cookie'
import {useHistory} from 'react-router-dom';

import Footer from './Footer';

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
export default function Login({setisAuthenticated, isAuthenticated, setError, redirect}) {
    const history = useHistory()
    if (isAuthenticated.status) {
        history.push(`/${redirect}`)
    }

    const [userDetails, setUserDetails] = useState({});
    const handleSubmit = (event) => {
        console.log("api url", process.env.REACT_APP_API_URL)
        event.preventDefault();
        transport.post(`${process.env.REACT_APP_API_URL}/login`, userDetails).then(res => {
            if (res.data.token != undefined) {
                Cookie.set('token', res.data.token)
                localStorage.setItem('token', res.data.token)
                setisAuthenticated({...isAuthenticated, status: true})
                setError(null)
            }
            else {
                setError(res.data)
                console.log(res.data)
            }
        }).catch(err => {
            console.log(err)
            setError(err)
        })
    };



    return (
        <>
        <ThemeProvider theme={theme} className="text-center">
            <Grid container component="main" sx={{height: '100vh'}} className="text-center">
                <Grid item xs={12} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                value={userDetails.email}
                                onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={userDetails.password}
                                label="Password"
                                type="password"
                                onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
                                id="password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="sign-in"
                                sx={{mt: 3, mb: 2}}
                                onClick={(e) => handleSubmit(e)}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <RouteLink to='/resetpassword'>
                                        <Link variant="body2">
                                            Forgot password?
                                        </Link>
                                    </RouteLink>
                                </Grid>
                                <Grid item>
                                    <RouteLink to='/signup'>
                                        <Link variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </RouteLink>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
        {Footer}
        <Footer/>
        </>
    );
}
