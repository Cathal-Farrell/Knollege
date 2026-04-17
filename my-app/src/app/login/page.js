'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// https://medium.com/@reactcompany01/how-to-redirect-urls-in-reactjs-507411f9e7b7
import { Redirect, Navigate } from 'react-router-dom';


export async function runDBCallAsync(url, setOpen) {

  const res = await fetch(url);

  const data = await res.json();


  if (data.data == "true") {
    
    console.log("login valid")
    alert("Login successful!");

    window.location.href = "/"; 
    return;
  } else {

    console.log("not valid")
    setOpen(true)
  }

}


export default function Home() {

  const handleSubmit = (event) => {
          
    console.log("handling submit");

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let email = data.get('email')

    let pass = data.get('pass')

    console.log("Sent email:" + email)

    console.log("Sent pass:" + pass)

    runDBCallAsync(`http://localhost:3000/api/login?email=${email}&pass=${pass}`, setOpen)

 }; // end handle submit

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  const Item = styled(Paper)(({ theme }) => ({
          backgroundColor: '#fff',
          ...theme.typography.body2,
          padding: theme.spacing(1),
          textAlign: 'center',
          color: (theme.vars ?? theme).palette.text.secondary,
          ...theme.applyStyles('dark', {
              backgroundColor: '#1A2027',
          }),
      }));

  return (

    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
        <Grid size={6} sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
            <Typography sx={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.2 }}>
              Knollege
            </Typography>
        </Grid>
        <Grid size={2}>
            <Item>
            <Button size="small" variant="outlined" href="/"> Home </Button>
            </Item>
        </Grid>
        <Grid size={2}>
            <Item>
            <Button size="small" variant="outlined" href="/login"> Login </Button>
            </Item>
        </Grid>
        <Grid size={2}>
            <Item>
            <Button size="small" variant="outlined" href="/chats"> Message </Button>
            </Item>
        </Grid>
        <Grid size={12}>
            <Item>

            <Container maxWidth="sm">

            <Box sx={{ height: '100vh' }} >

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                <TextField

                    margin="normal"

                    required

                    fullWidth

                    id="email"

                    label="Email Address"

                    name="email"

                    autoComplete="email"

                    autoFocus

                />

                <TextField

                    margin="normal"

                    required

                    fullWidth

                    name="pass"

                    label="Pass"

                    type="pass"

                    id="pass"

                    autoComplete="current-password"

                />

                <FormControlLabel

                    control={<Checkbox value="remember" color="primary" />}

                    label="Remember me"

                />

                <Button

                    type="submit"

                    fullWidth

                    variant="contained"

                    sx={{ mt: 3, mb: 2 }}

                >

                    Sign In

                </Button>

                </Box>

                <Button

                    fullWidth

                    variant="outlined"

                    sx={{ mt: 0, mb: 2 }}

                    href="/signup"

                >

                    Create an account

                </Button>

            </Box>

            </Container>
            </Item>
        </Grid>
        </Grid>

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Login failed!"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                please try again.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} autoFocus>
                Okay
            </Button>
            </DialogActions>
        </Dialog>

    </Box>

    
  ); // end return

}