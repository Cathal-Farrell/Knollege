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
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from '@tiptap/markdown'

export default function MultilineTextFields() {

  const inputRef = React.useRef(null);
  const noteIDRef = React.useRef(null);
  const userIDRef = React.useRef(null);
  const searchParams = useSearchParams();
  const noteIDURL = searchParams.get('noteID') || '1';
  const userIDURL = searchParams.get('userID') || '100';
  const [userEmail, setUserEmail] = useState("100");
  let textChanged = false;
  let editor = null;

  // Run loop every 5 seconds
  React.useEffect(() => {
     async function fetchSession() {
            const res = await fetch('http://localhost:3000/api/sessionEmail');
            const sessionData = await res.json();
            if (sessionData.email !== "Not Logged In") {
                setUserEmail(sessionData.email);
            }
        }
        fetchSession();

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
    const noteID = noteIDRef.current?.value;
    const userID = userIDRef.current?.value;

    console.log("current text:", data);

    runDBCallAsync(`http://localhost:3000/api/uploadtext?text=${encodeURIComponent(data)}&noteID=${noteID}&userID=${userID}`);
  }

  const handleSyncText = (event) => {
          
    console.log("handling sync");

    const noteID = noteIDRef.current?.value;
    console.log(noteID);
    const userID = userIDRef.current?.value;
    console.log(userID);
    runDBCallAsyncDownload(`http://localhost:3000/api/synctext?noteID=${noteID}&userID=${userID}`)

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
    editor.commands.setContent(data[0].text)

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


  const Tiptap = () => {
    editor = useEditor({
      extensions: [StarterKit, Markdown],
      content: inputRef.current?.value || "Nothing",
      onUpdate: () => {
        // The content has changed.
        console.log("tiptap text changed");
        textChanged = true;
      },
      // Don't render immediately on the server to avoid SSR issues
      immediatelyRender: false,
    })

    return <EditorContent editor={editor} 
      onChange={({ editor }) => {
        // The content has changed.
        console.log("tiptap text changed");
        textChanged = true;
      }}/>
  }

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
              <Item id="toolbar">
                    <Tiptap/>
              </Item>
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