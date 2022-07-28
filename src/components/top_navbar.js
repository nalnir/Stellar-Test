import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const TopNavbar = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const pair = localStorage.getItem('stellar_test_account_encrypted')
        if(pair) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    },[])

    const logout = () => {
        localStorage.removeItem('stellar_test_account_encrypted');
        setLoggedIn(false);
        navigate('/account', { replace: true });
    }

    const renderLogoutButton = () => {
        if(loggedIn) {
            return <Button color='inherit' onClick={() => logout()}>Logout</Button>
        } 
        return <div></div>
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position='fixed'>
                    <Toolbar>
                        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                            Stellar Test
                        </Typography>
                        {renderLogoutButton()} 
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}

export default TopNavbar;