'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function MultilineTextFields() {

  const inputRef = React.useRef(null);
  const noteIDRef = React.useRef(null);
  const userIDRef = React.useRef(null);
  const searchParams = useSearchParams();
  const noteIDURL = searchParams.get('noteID');
  const userIDURL = searchParams.get('userID');
  const [userEmail, setUserEmail] = useState(null);
  const userEmailRef = React.useRef(null);
  const textChanged = React.useRef(false);;


  // Update ref whenever userEmail changes
  React.useEffect(() => {
    userEmailRef.current = userEmail;
  }, [userEmail]);

  // Run loop every 5 seconds
  React.useEffect(() => {
     async function fetchSession() {
            const res = await fetch('http://localhost:3000/api/session');
            const sessionData = await res.json();
            if (sessionData.email !== "Not Logged In") {
                setUserEmail(sessionData.email);
            }
        }
        fetchSession();

    handleSyncText();
    const intervalID = setInterval(() => {
      console.log(textChanged);
      if (textChanged.current == true) {
        console.log("Saving");
        handleUploadText();
        textChanged.current = false;
      }
      else {
        console.log("No change");
        console.log(userEmail);
        handleSyncText();
      }
    }, 5000);

    return () => clearInterval(intervalID);
  }, []);
    
  function handleTextChanged() {
    console.log("text changed");
    textChanged.current = true;
  }

  
  function handleUploadText() {
    console.log("called the function");

    // Get current textbox value
    const data = inputRef.current?.value || "";

    console.log("current text:", data);

    runDBCallAsync(`http://localhost:3000/api/uploadtext?text=${encodeURIComponent(data)}&noteID=${noteIDURL}&userID=${userEmailRef.current}`);
  }

  const handleSyncText = (event) => {
          
    console.log("handling sync");

    const noteID = noteIDRef.current?.value;
    console.log(noteID);
    const userID = userIDRef.current?.value;
    console.log(userID);
    runDBCallAsyncDownload(`http://localhost:3000/api/synctext?noteID=${noteID}&userID=${userEmailRef.current}`)

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
 
    inputRef.current.value = data[0].text;
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
                    sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField 
                        id="outlined-basic" 
                        label="Note File" 
                        variant="outlined" 
                        defaultValue={noteIDURL}
                        inputRef={noteIDRef}/>
                    <TextField 
                        label="User Email:"
                    variant="outlined"
                    value={userEmail}
                    inputRef={userIDRef}
                    slotProps={{
                      htmlInput: { readOnly: true },
                    }}/>
                </Box>
              </Item>
            </Grid>
            <Grid size={10}>
              <Item id="editor">
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '150ch' } }}
                  
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    inputRef={inputRef}
                    id="textField"
                    name="textField"
                    multiline
                    rows={25}
                    defaultValue=""
                    onChange={handleTextChanged}
                  />
                </Box>
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