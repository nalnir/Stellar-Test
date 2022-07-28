import React from 'react';

//MUI
import { Grid } from '@mui/material';

//Component
import TopNavbar from '../../components/top_navbar';
import Sender from './sender/sender';

const Landing = () => {
    return (
        <div>
            <TopNavbar></TopNavbar>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Sender></Sender>
                </Grid>
            </Grid>
        </div>
    );
}

export default Landing;