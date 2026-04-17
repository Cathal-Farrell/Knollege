'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';


export default function MultilineTextFields() {

  const inputRef = React.useRef(null);
  const outputRef = React.useRef(null);
  const userIDRef = React.useRef(null);
  const searchParams = useSearchParams();
  const chatIDUrl = searchParams.get('chatID') || '1';
  const userIDUrl = searchParams.get('userID') || '100';
  const [chatName, setChatName] = useState('Loading...');

  let textChanged = false;

  // Run loop every 5 seconds
  React.useEffect(() => {
    
    async function loadChatName() {
      setChatName('Loading...');
      const res = await fetch(`/api/getchatname?chatID=${encodeURIComponent(chatIDUrl)}`);
      const data = await res.json();
      setChatName(data.chatName || 'Unknown chat');
    }

    loadChatName();
    handleSyncText();
    const intervalID = setInterval(() => {
      if (textChanged == true) {
        handleUploadText();
        textChanged = false;
      }
      else {
        console.log("No change");
        handleLiveSyncText();
      }
    }, 1000);

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalID);
  }, []);

  
  function handleTextChanged() {
    console.log("text changed");
    textChanged = true;
  }

  
  function handleUploadText() {
    console.log("called the function");

    // Get current textbox value
    const data = inputRef.current?.value || "";
    const chatID = chatIDUrl;
    const userID = userIDRef.current?.value || "";

    console.log("current text:", data);

    runDBCallAsync(`/api/uploadmsg?text=${encodeURIComponent(data)}&chatID=${chatID}&userID=${userID}`);

    inputRef.current.value = "";
  }

  const handleSyncText = (event) => {
          
    console.log("handling sync");

    const chatID = chatIDUrl;
    console.log(chatID);
    const userID = userIDRef.current?.value;
    console.log(userID);
    runDBCallAsyncDownload(`/api/syncmsg?chatID=${chatID}&userID=${userID}`)

  }
  
  const handleLiveSyncText = (event) => {
          
    console.log("handling repeated sync");

    const chatID = chatIDUrl;
    console.log(chatID);
    const userID = userIDRef.current?.value;
    console.log(userID);
    runDBCallAsyncDownload(`/api/repeatsyncmsg?chatID=${chatID}&userID=${userID}`)

  }

  async function runDBCallAsync(url) {

    const res = await fetch(url);
    if (!res.ok) {
    outputRef.current.value = "sync request failed";
    return;
    }
    const data = await res.json();


    if(data.data== "valid"){

      console.log("login is valid!")

    } else {

      console.log("not valid  ")

    }

  }

  async function runDBCallAsyncDownload(url) {

    const res = await fetch(url);

    const data = await res.json();


    if(data.length > 0){

      console.log("data is valid!")

    } else {

      console.log("not valid  ")
      outputRef.current.value = "File Not Found";
      return;

    }
   

    console.log(data[0]);

    var displayTexts = "";
    var returnTexts = data[0].text;


    

    for (var msg in returnTexts) {
      displayTexts += returnTexts[msg][0] + ": " + returnTexts[msg][1] +"\n"
    }
 
    outputRef.current.value = displayTexts;

  }

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
    <Box sx={{ flexGrow: 1, backgroundColor: "var(--mood-bg)" }}>
       <Box sx={{ position: "fixed", right: "20px", top: "140px", zIndex: 2000 }}>
            {[
              ["😀", "#fff7b3"],
              ["🙂", "#d9ffb3"],
              ["😐", "#e8e8e8"],
              ["😢", "#cfe6ff"],
              ["😡", "#ffb3b3"]
            ].map(([emoji, color]) => (
              <Button
                key={emoji}
                onClick={() => {
                  document.documentElement.style.setProperty("--mood-bg", color);
                }}
                sx={{
                  display: "block",
                  mb: 1,
                  background: "white",
                  borderRadius: "50px",
                  minWidth: "60px",
                  fontSize: "1.4rem",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                }}
              >
                {emoji}
              </Button>
            ))}
          </Box>
          
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
            <Grid size={2}>
              <Item>
                <Box
                    sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField 
                        id="outlined-basic" 
                      label="Chat Name" 
                        variant="outlined" 
                      value={chatName}
                      inputProps={{ readOnly: true }}/>
                    <TextField 
                        id="outlined-basic" 
                        label="User" 
                        variant="outlined" 
                        defaultValue={userIDUrl}
                        inputRef={userIDRef}
                        inputProps={{ readOnly: true }}/>
                </Box>
              </Item>
            </Grid>
            <Grid size={10}>
              <Item>
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '155ch' } }}
                  
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    inputRef={outputRef}
                    inputProps={{ readOnly: true }} // https://muhimasri.com/blogs/mui-textfield-readonly/
                    id="allMessagesField"
                    name="allMessagesField"
                    multiline
                    rows={15}
                    defaultValue=""
                  />
                </Box>
                <Grid container spacing={2}>
                  <Grid size={11}>
                    <Box
                      component="form"
                      sx={{ '& .MuiTextField-root': { m: 1, width: '141ch' } }}
                      
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        inputRef={inputRef}
                        id="textField"
                        name="textField"
                        multiline
                        rows={3}
                        defaultValue=""
                      />
                    </Box>
                  </Grid>
                  <Grid size={1}>
                    <Button variant="outlined" onClick={() => handleUploadText()}>
                      Send
                    </Button>
                  </Grid>
                </Grid>
                
              </Item>
              
            </Grid>
            <Grid size={8}>
              
            </Grid>
            <Grid size={2}>
              
            </Grid>
          </Grid>
        </Box>
  );
}