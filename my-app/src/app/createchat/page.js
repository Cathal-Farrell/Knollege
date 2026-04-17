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
import { useRouter } from 'next/navigation';


export default function Home() {

    const router = useRouter();

    const handleSubmit = async (event) => {

    console.log("handling submit");

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let chatName = data.get('chatName')

    let members = data.get('members')

    console.log("Sent name:" + chatName)

    console.log("Sent members:" + members)

        const sessionRes = await fetch('/api/session');
        const sessionData = await sessionRes.json();
        const admin = sessionData?.email;

        runDBCallAsync(
            `http://localhost:3000/api/newchat?chatName=${encodeURIComponent(chatName)}&members=${encodeURIComponent(members)}&admin=${encodeURIComponent(admin)}`,
            admin
        )

  };

    async function runDBCallAsync(url, creatorUserID) {

    const res = await fetch(url);

    const data = await res.json();


    if (data.data == "valid") {

      console.log("Group creation is valid!")
        // if valid, redirects to that new chat
        router.push(`/message?chatID=${encodeURIComponent(data.chatID)}&userID=${encodeURIComponent(creatorUserID)}`);

    } else if (data.data == "invalid"){

      console.log("not valid  ")
      handleClickOpenInvalid();
    } else if (data.data == "incomplete"){

      console.log("not complete  ")
      handleClickOpenIncomplete();
    } else if (data.data == "incompliant"){

      console.log("not compliant  ")
      handleClickOpenIncompliant();
    }

  }

    const [openInvalid, setOpenInvalid] = React.useState(false);
    const [openIncomplete, setOpenIncomplete] = React.useState(false);
    const [openIncompliant, setOpenIncompliant] = React.useState(false);
  
    const handleClickOpenInvalid = () => {
        setOpenInvalid(true);
    };

    const handleClickOpenIncomplete = () => {
        setOpenIncomplete(true);
    };

    const handleClickOpenIncompliant = () => {
        setOpenIncompliant(true);
    };

    const handleCloseInvalid = () => {
        setOpenInvalid(false);
    };

    const handleCloseIncomplete = () => {
        setOpenIncomplete(false);
    };

    const handleCloseIncompliant = () => {
        setOpenIncompliant(false);
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
                        name="chatName"
                        label="Chat Name"
                        type="name"
                        id="chatName"
                        autoComplete=""
                        autoFocus
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="members"
                        label="Emails, seperate with commas"
                        type="members"
                        id="members"
                        autoComplete=""

                    />

                    <Button

                        type="submit"

                        fullWidth

                        variant="contained"

                        sx={{ mt: 3, mb: 2 }}

                    >

                        Create

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
            {"Group creation failed!"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                This chat ID is already in use.
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
            {"Group creation failed!"}
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
            open={openIncompliant}
            onClose={handleCloseIncompliant}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Group creation failed!"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Members should be listed by userID, seperated by a comma and no space.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseIncompliant} autoFocus>
                Okay
            </Button>
            </DialogActions>
        </Dialog>

    </Box>
    
  ); 
}
