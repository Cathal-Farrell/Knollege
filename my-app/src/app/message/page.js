'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';

export default function MultilineTextFields() {

  const inputRef = React.useRef(null);
  const outputRef = React.useRef(null);
  const chatIDRef = React.useRef(null);
  const userIDRef = React.useRef(null);
  let textChanged = false;

  // Run loop every 5 seconds
  React.useEffect(() => {
    handleSyncText();
    const intervalID = setInterval(() => {
      if (textChanged == true) {
        handleUploadText();
        textChanged = false;
      }
      else {
        console.log("No change");
        handleSyncText();
      }
    }, 5000);

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
    const chatID = chatIDRef.current?.value || "";
    const userID = userIDRef.current?.value || "";

    console.log("current text:", data);

    runDBCallAsync(`http://localhost:3000/api/uploadmsg?text=${encodeURIComponent(data)}&chatID=${chatID}&userID=${userID}`);

    inputRef.current.value = "";
  }

  const handleSyncText = (event) => {
          
    console.log("handling sync");

    const chatID = chatIDRef.current?.value;
    console.log(chatID);
    const userID = userIDRef.current?.value;
    console.log(userID);
    runDBCallAsyncDownload(`http://localhost:3000/api/syncmsg?chatID=${chatID}&userID=${userID}`)

  }

  async function runDBCallAsync(url) {

    const res = await fetch(url);

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
      data[0] = {"text" : "Error: File not found"}

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
            <Grid size={2}>
              <Item>
                <Box
                    sx={{ '& > :not(style)': { m: 1, width: '15ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField 
                        id="outlined-basic" 
                        label="Chat" 
                        variant="outlined" 
                        defaultValue={chatIDRef.current?.value || "1"}
                        inputRef={chatIDRef}/>
                    <TextField 
                        id="outlined-basic" 
                        label="User" 
                        variant="outlined" 
                        defaultValue={userIDRef.current?.value || "100"}
                        inputRef={userIDRef}/>
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