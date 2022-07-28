import React, { useState } from 'react';

//MUI
import { Grid, Card, FormControl, Button, TextField } from '@mui/material';

//Stellar
import { sendLumens } from '../../../providers/stellar_service';

//Components
import RegexTextField from '../../../components/regex_textfield';
import ErrorSuccessSnackbar from '../../../components/error_success_snackbar';

const Sender = () => {
    const onlyAlphanumericRegex = /[^a-z0-9]/gi;
    const onlyNumericRegex = /[^0-9]/gi;
    const [lumenAmount, setLumenAmount] = useState('');
    const [destinationId, setDestinationId] = useState('GBE5WUWR6DRFIZVEBD52PRV4EX2HTJ4SJQMCFBJV22G7LCVK5LPWQYFP');
    const [loading, setLoading] = useState(false);
    const [openSuccessOrError, setOpenSuccessOrError] = useState(false);
    const [successOrError, setSuccessOrError] = useState('');

    const send = () => {
        var sourceKeys = JSON.parse(localStorage.getItem('stellar_test_account_encrypted'));
        if(lumenAmount.length > 0 && parseInt(lumenAmount) > 0) {
            setLoading(true);
            sendLumens(sourceKeys, lumenAmount, destinationId, (res) => {
                if(res.severity === 'success') {
                    setLoading(false);
                    setSuccessOrError(res);
                    setOpenSuccessOrError(true);
                } else {
                    setLoading(false);
                    setSuccessOrError(res);
                    setOpenSuccessOrError(true);
                }
            });
        } else {
            setSuccessOrError({ severity: 'error', message: 'Lumen Amount must be more than 0!' });
            setOpenSuccessOrError(true);
        }
    }

    const renderButtonOrLoader = () => {
        if(loading) {
            return <Button disabled={loading} color='inherit'>loading...</Button>
        }
        return <Button color='inherit' onClick={() => send()}>send</Button>
    }

    return (
        <Card raised={true} sx={{ height: '100vh', margin: '1%', display: 'flex', alignItems: 'center', justifyContent:'center' }}>
            <FormControl>
                <Grid container spacing={2}>
                    <Grid item lg={12}> 
                <RegexTextField
                    regex={onlyNumericRegex}
                    value={lumenAmount}
                    onChange={(e) => setLumenAmount(e.target.value)}
                    label='How much Lumen do you want to send?'
                    variant='outlined'
                /></Grid>
                <Grid item lg={12}> 
                <TextField
                    value={destinationId}
                    onChange={(e) => setDestinationId(e.target.value)}
                    label='Destination ID'
                ></TextField></Grid>
                <Grid item lg={12}>
                    {renderButtonOrLoader()}
                </Grid>
                </Grid>
            </FormControl>
            <ErrorSuccessSnackbar open={openSuccessOrError} successOrError={successOrError} closeSuccessOrError={setOpenSuccessOrError}></ErrorSuccessSnackbar>
        </Card>
    );
}

export default Sender;