import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Stellar
import { generateRandomKeypair } from '../../../providers/stellar_service';

//MUI
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

// Components
import ErrorSuccessSnackbar from '../../../components/error_success_snackbar';

const AccountCreate = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [openSuccessOrError, setOpenSuccessOrError] = useState(false);
    const [successOrError, setSuccessOrError] = useState('');

    const generate = () => {
        setLoading(true);
        generateRandomKeypair((result) => {
            if(result === 'success') {
                setLoading(false);
                return navigate('/landing', { replace: true });
            } else {
                setLoading(false);
                setSuccessOrError(result);
                setOpenSuccessOrError(true);
            }
        })
    }

    const renderButtonOrLoader = () => {
        if(loading) {
            return <Button disabled={loading} color='primary' size='small'>Loading...</Button>
        }
        return <Button color='primary' onClick={() => generate()} size='small'>Create</Button>
    }
    
    return (
        <Card raised={true} sx={{ height: '100vh', margin: '1%', display: 'flex', alignItems: 'center', justifyContent:'center' }}> 
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color='text.primary' gutterBottom>
                    Create stellar test account
                </Typography>
            </CardContent>
            <CardActions>
                {renderButtonOrLoader()}
            </CardActions>
            <ErrorSuccessSnackbar open={openSuccessOrError} successOrError={successOrError} closeSuccessOrError={setOpenSuccessOrError}></ErrorSuccessSnackbar>
        </Card>
    );
}

export default AccountCreate;