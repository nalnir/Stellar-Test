import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material'

const ErrorSuccessSnackbar = (props) => {
    return (
        <Snackbar
            open={props.open}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={() => props.closeSuccessOrError(false)} severity={props.successOrError.severity} sx={{ width: '100%' }}>
                {props.successOrError.message}
            </Alert>
        </Snackbar>
    );
}

export default ErrorSuccessSnackbar;