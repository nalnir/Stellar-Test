import React from 'react';
import goodvibes from '../../assets/images/goodvibes.svg';

//MUI
import { Grid } from '@mui/material';

//Components
import TopNavbar from '../../components/top_navbar';
import AccountCreate from './create/account_create';
import ImageCard from '../../components/image_card';

const Account = () => {
    return (
        <div>
            <TopNavbar></TopNavbar>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <AccountCreate></AccountCreate>
                </Grid>
                <Grid item xs={6}>
                    <ImageCard image={goodvibes} imageTitle={'Good Vibes'}></ImageCard>
                </Grid>
            </Grid>
        </div>
    );
}

export default Account;
