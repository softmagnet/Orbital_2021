import React, { useState } from 'react';
import { Avatar, Button, Container, CssBaseline, FormControl, InputLabel, OutlinedInput, Typography, Grid, FormControlLabel, Checkbox, Link, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useAuth } from '../contexts/AuthContext';
import Alert from '@material-ui/lab/Alert';
import Copyright from '../components/Copyright';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
  }));

function Login() {

    const classes = useStyles()

    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    

    const onEmailChange = (e) => {        
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {        
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            setError('')
            await login(email, password)
            history.push('/')
        } catch (e) {
            setError(e.message)
        }

        setLoading(false)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon fontSize='medium' />
                </Avatar>
                <Typography variant="h5" component="h1" gutterBottom>
                    Sign In
                </Typography>                
            
            {error && <Alert severity="error">{error}</Alert>}

                <form  className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" required fullWidth>
                                <InputLabel htmlFor="component-outlined">Email</InputLabel>
                                <OutlinedInput className={classes.input} id="component-outlined" value={email} onChange={onEmailChange} label="Email" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" required fullWidth>
                                <InputLabel htmlFor="component-outlined">Password</InputLabel>
                                <OutlinedInput type="password" id="component-outlined" value={password} onChange={onPasswordChange} label="Password" />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button   
                        className={classes.submit}                 
                        type='submit'
                        color='primary'
                        variant='contained'
                        endIcon={<KeyboardArrowRightIcon />}
                        size='large'                                                                           
                        disabled={loading}
                        fullWidth
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='/'>
                                Forgot your password?
                            </Link>
                        </Grid>
                        <Grid item>                   
                            <Link href='./register'>                         
                                Don't have an account? Sign up
                            </Link>
                        </Grid>
                     </Grid>
                </form>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </div>      
        </Container>
    );
  }
  
  export default Login;
  