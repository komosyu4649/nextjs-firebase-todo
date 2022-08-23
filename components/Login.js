import { Button, Grid } from '@mui/material'
import React from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {
    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
    }
    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "100vh"}}>
             <Button variant="contained"  startIcon={<GoogleIcon/>}
                     onClick={loginWithGoogle}>
                    sigin in google
            </Button>
        </Grid>
    )
}

export default Login
