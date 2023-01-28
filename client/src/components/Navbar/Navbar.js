import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import useStyles from './styles.js'
import memories from '../../images/memories.png';
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { auth_logout_remove_from_localstorage } from '../../store/authslice.js';


const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch(auth_logout_remove_from_localstorage())
        history.push('/');
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;

        // JWT...// expire after 1hr. 
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h4" align="center">SocialMedia</Typography>
                <img className={classes.image} src={memories} alt='memories' height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} component={Link} to={`/profile/${user.result.name}`} variant="h6">{user.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant='contained' color='primary' >Sign-in</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar