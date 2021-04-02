import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import { GoogleLogin } from 'react-google-login'
import { useHistory } from 'react-router-dom'

import useStyles from './styles'
import Icon from './Icon'
import Input from './Input'
import { useDispatch } from 'react-redux'

const Auth = () => {

    const classes = useStyles()
    const [ showPassword, setShowPassword ] = useState(false)
    const [ isSignup, setIsSignup ] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = () => {}

    const handleChange = () => {}

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        handleShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({ type: 'AUTH', data: { result, token } })

            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (ero) => {
        console.log("Google Sign In was unsuccessful. Tyr Again Later")
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={ classes.paper } elevation={3}>
                <Avatar className={ classes.avatar }>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={ classes.form } onSubmit={ handleSubmit }>
                    <Grid container spacing={2}>
                        { isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={ handleChange } autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={ handleChange } half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={ handleChange } type="email" />
                        <Input name="password" label="Password" handleChange={ handleChange } type={ showPassword ? 'text' : 'password' } handleShowPassword={ handleShowPassword } />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={ handleChange } type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={ classes.submit }>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin 
                        // GOOGLE API KEY
                        clientId=""
                        render={(renderProps) => (
                            <Button 
                                className={ classes.googleButton } 
                                color='primary' 
                                fullWidth 
                                onClick={ renderProps.onClick } 
                                disabled={ renderProps.disabled } 
                                startIcon={ <Icon /> } 
                                variante="contained" 
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={ googleSuccess }
                        inFailure={ googleFailure }
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={ switchMode }>
                                { isSignup ? 'Already have and account? Sign In' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
