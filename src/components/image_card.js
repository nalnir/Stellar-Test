import React from 'react';
import { Card, CardContent } from '@mui/material'

const ImageCard = (props) => {
    return (
        <Card raised={true} sx={{ height: '100vh', margin: '1%', display: 'flex', alignItems: 'center', justifyContent:'center' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <img
                    src={`${props.image}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${props.image}?w=164&h=164&fit=crop&auto=format&dpr=2 1.5x`}
                    alt={props.imageTitle}
                    loading='lazy'
                />
            </CardContent>
        </Card>
    );
}

export default ImageCard;