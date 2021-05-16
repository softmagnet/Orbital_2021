import { Button, debounce, FormControl, Grid, InputLabel, OutlinedInput, Paper, Typography } from '@material-ui/core';
import { Link, useHistory }  from 'react-router-dom';
import React, { useRef, useState } from 'react';
import AppForm from '../views/AppForm2';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { useAuth } from '../contexts/AuthContext'
import Alert from '@material-ui/lab/Alert';
import { db } from '../firebase'





function Register() {
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassowrd, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }
     
    const onFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }

    const onLastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassowrd) {
            return setError("Passwords do not match")
        }

        try {
            setLoading(true)
            setError('')
            const cred = await signup(email, password)
            await db.collection('users').doc(cred.user.uid).set({
                email,
                password,
                firstName,
                lastName
            })
            
            history.push('/')
        } catch (e) {
            setError(e.message)
        }

        setLoading(false)
    }

    return (
        <div> 
            <AppForm>
                <div align='center' style={{marginBottom: '5px'}}>
                <AccountBoxIcon color='white' fontSize='large' />
                </div>

                <div >
                    <Typography variant="h3" gutterBottom  align="center">
                        Sign Up
                    </Typography>                
                </div>
                    
                {error && <Alert severity="error">{error}</Alert>}
            
                <form align="center" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container >
                        <Grid item xs={6}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="firstName">First name</InputLabel>
                            <OutlinedInput id="firstName" value={firstName} onChange={onFirstNameChange} label="First name" />
                        </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="lastName">Last name</InputLabel>
                                <OutlinedInput id="lastName" value={lastName} onChange={onLastNameChange} label="Last name" />
                            </FormControl>    
                        </Grid>
                    </Grid>         

                    <br />
                    
                    <div>
                        <FormControl style={{width: '400px'}} variant="outlined">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput type="email" id="email" label="Email" onChange={onEmailChange} value={email}/>
                        </FormControl>
                    </div>
                        
                    <br />
                    
                    <div>
                        <FormControl style={{width: '400px'}} variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput required type="password" id="password" label="Password" onChange={onPasswordChange} value={password}/>
                        </FormControl>
                    </div>                                           
                        
                    <br />

                    <div>
                        <FormControl style={{width: '400px'}} variant="outlined">
                            <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
                            <OutlinedInput required type="password" id="confirmPassword" label="Confirm password" onChange={onConfirmPasswordChange} value={confirmPassowrd} />
                        </FormControl>
                    </div>                                           
                        
                    <br />
                    
                    <Button
                        type='submit'
                        color='primary'
                        variant='contained'
                        endIcon={<KeyboardArrowRightIcon />} 
                        size='large'
                        disabled={loading}
                                                
                    >
                        Register
                    </Button>
                    
                    
                    
                </form>
            <br />
            <Typography variant="body2" align="center">
                    {'Already have an account? '}
                    <Link to='/login'>
                        Sign in here
                    </Link>
            </Typography> 

            
            </AppForm>
        </div>
    );
  }
  
  export default Register;
  