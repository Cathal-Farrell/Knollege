'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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


export default function Home() {

  const handleSubmit = (event) => {

    console.log("handling submit");

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let name = data.get('name')

    let email = data.get('email')

    let pass = data.get('pass')

    let confirmPass = data.get('confirmPass')

    console.log("Sent name:" + name)

    console.log("Sent email:" + email)

    console.log("Sent pass:" + pass)

    console.log("Sent confirm pass:" + confirmPass)

    runDBCallAsync(`http://localhost:3000/api/newregister?name=${name}&email=${email}&pass=${pass}&confirmPass=${confirmPass}`)

  }; // end handle submit

  async function runDBCallAsync(url) {

    const res = await fetch(url);

    const data = await res.json();


    if (data.data == "valid") {

      console.log("login is valid!")

    } else if (data.data == "invalid"){

      console.log("not valid  ")
      handleClickOpenInvalid();
    } else if (data.data == "incomplete"){

      console.log("not complete  ")
      handleClickOpenIncomplete();
    } else if (data.data == "inconsistent"){

      console.log("not consistent  ")
      handleClickOpenInconsistent();
    }

  }



    const [openInvalid, setOpenInvalid] = React.useState(false);
    const [openIncomplete, setOpenIncomplete] = React.useState(false);
    const [openInconsistent, setOpenInconsistent] = React.useState(false);
  
    const handleClickOpenInvalid = () => {
        setOpenInvalid(true);
    };

    const handleClickOpenIncomplete = () => {
        setOpenIncomplete(true);
    };

    const handleClickOpenInconsistent = () => {
        setOpenInconsistent(true);
    };

    const handleCloseInvalid = () => {
        setOpenInvalid(false);
    };

    const handleCloseIncomplete = () => {
        setOpenIncomplete(false);
    };

    const handleCloseInconsistent = () => {
        setOpenInconsistent(false);
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
        <Grid size={4}>
            <Item>
            <Button variant="outlined" href="/"> Home </Button>
            </Item>
        </Grid>
        <Grid size={4}>
            <Item>
            <Button variant="outlined" href="/login"> Login </Button>
            </Item>
        </Grid>
        <Grid size={4}>
            <Item>
            <Button variant="outlined" href="/chats"> Message </Button>
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
                        name="name"
                        label="Name"
                        type="name"
                        id="name"
                        autoComplete=""

                    />

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

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPass"
                        label="Confirm Pass"
                        type="confirmPass"
                        id="confirmPass"
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

                </Box>

                </Container>

            </Item>
        </Grid>
        </Grid>

        <Dialog
            open={openInvalid}
            onClose={handleCloseInvalid}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Sign-up failed!"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                This e-mail is already in use by another account.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseInvalid} autoFocus>
                Okay
            </Button>
            </DialogActions>
        </Dialog>

        <Dialog
            open={openIncomplete}
            onClose={handleCloseIncomplete}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Sign-up failed!"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Please fill-in all input fields.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseIncomplete} autoFocus>
                Okay
            </Button>
            </DialogActions>
        </Dialog>

        <Dialog
            open={openInconsistent}
            onClose={handleCloseInconsistent}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Sign-up failed!"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Passwords do not match.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseInconsistent} autoFocus>
                Okay
            </Button>
            </DialogActions>
        </Dialog>

    </Box>

  ); // end return

}