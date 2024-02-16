import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import theme from '../../theme'
import CardMedia from '@mui/material/CardMedia'
import { auth } from '../auth/auth-helper';



const sxStyle = {
    card: {
        width: '90%',
        margin: 'auto',
        marginTop: 20,
        marginBottom: theme.spacing(2),
        padding: 2,
        backgroundColor: '#ffffff'
    },
    extraTop: {
        marginTop: theme.spacing(12)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400
    },
    enrolledTitle: {
        color:'#efefef',
        marginBottom: 5
      },
}

const Home = () => {



  
    return (
        <div style={sxStyle.extraTop}>
            <Card sx={sxStyle.card}>

            </Card>
        </div>
    )
}

export default Home;