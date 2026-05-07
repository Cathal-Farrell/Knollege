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
import Navbar from '@/components/NavBar';

export default function MultilineTextFields() {

  const inputRef = React.useRef(null);
  const titleInputRef = React.useRef(null);
  const noteIDRef = React.useRef(null);
  const userIDRef = React.useRef(null);
  const searchParams = useSearchParams();
  const noteIDURL = searchParams.get('noteID');
  const userIDURL = searchParams.get('userID');
  const [userEmail, setUserEmail] = useState(null);
  const userEmailRef = React.useRef(null);
  const shareEmailRef = React.useRef(null);
  const textChanged = React.useRef(false);

  const [groups, setGroups] = useState([]);   
  const [selectedGC, setSelectedGC] = useState("");
  const [hasPermission, setHasPermission] = useState(true);

  const hasInitialized = React.useRef(false);


  // Update ref whenever userEmail changes
  React.useEffect(() => {
    userEmailRef.current = userEmail;
    console.log(userEmailRef.current)
  }, [userEmail]);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch('http://localhost:3000/api/sessionEmail');
      const sessionData = await res.json();
      if (sessionData.email !== "Not Logged In") {
          setUserEmail(sessionData.email);
      }
    }
    fetchSession();
  }, []);

  // load group chats for dropdown
  useEffect(() => { 
    async function loadGroups() {
      if (!userEmailRef) return;
      const res = await fetch(`/api/getUserChats?userID=${userEmailRef.current}`);
      const data = await res.json(); 
      setGroups(data);
    }
    loadGroups();
  }, [userEmail]); 

  // Run loop every 5 seconds
  useEffect(() => {
    if (userEmail == null) return;

    if (!hasInitialized.current) {
      handleSyncText();
      hasInitialized.current = true;
    }

    
  }, [groups]);

  useEffect(() => {
    if (hasInitialized.current) return;

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

  }, [hasInitialized])
    
  function handleTextChanged() {
    console.log("text changed");
    textChanged.current = true;
  }

  
  function handleUploadText() {
    console.log("called the function");

    // Get current textbox and title value
    const data = inputRef.current?.value || "";
    console.log("current text:", data);
    const title = titleInputRef.current?.value || "";
    console.log("current title:", title);
   

    runDBCallAsync(`http://localhost:3000/api/uploadtext?text=${encodeURIComponent(data)}&title=${title}&noteID=${noteIDURL}&userID=${userEmailRef.current}`);
  }

  const handleSyncText = async () => {
    console.log("handling sync");

    const res = await fetch(`http://localhost:3000/api/synctext?noteID=${noteIDURL}&userID=${userEmailRef.current}`);
    const data = await res.json();

    if (data.length === 0) {
        console.log("NO PERMISSION");
        setHasPermission(false);
        return;
    }

    setHasPermission(true);

    console.log("data is valid!");
    console.log(data[0]);

    inputRef.current.value = data[0].text;
    titleInputRef.current.value = data[0].fileName;
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
    titleInputRef.current.value = data[0].fileName;
  }

  function handleShareNote() {
  if (selectedGC) { 
    fetch(`/api/addNote?chatID=${selectedGC}&noteID=${noteIDURL}`)
      .then(() => {
        window.location.href = `/message?chatID=${selectedGC}&userID=${userEmailRef.current}`;
      });
  }
}

  async function handleAcceptInvite() {
    console.log("accepting invite...");

    const res = await fetch(`/api/acceptInvite?noteID=${noteIDURL}&userID=${userEmailRef.current}`);
    const data = await res.json();

    if (data.data === "valid") {
        console.log("Invite accepted!");
        window.location.reload();
    }
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
    <Box sx={{ flexGrow: 1, backgroundColor: "var(--mood-bg)", transition: "background-color 0.4s ease", mt: 5, mb: 4 }}>
      <Navbar />
      <Box sx={{ position: "fixed", right: "20px", top: "340px", zIndex: 2000 }}>
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

      <Grid container spacing={2} sx={{ mt: 2 , ml: 2}}>
        <Grid size={8}>
          <Item>
            <Box sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
              <TextField
                fullWidth
                inputRef={titleInputRef}
                id="titleField"
                name="titleField"
                onChange={handleTextChanged}
                disabled={!hasPermission}
              />
            </Box>
          </Item>
        </Grid>
        <Grid size={3}>
          <Item>
            <Box
                sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
                noValidate
                autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid size={8}>
                  <TextField
                    fullWidth
                    select
                    label="Send to Group Chat"
                    SelectProps={{ native: true }}
                    value={selectedGC}
                    onChange={(e) => setSelectedGC(e.target.value)}
                  >
                    <option value="none">None</option>
                    {groups.map((g) => (
                      <option key={g.chatID} value={g.chatID}>
                        {g.chatName}
                      </option>
                    ))} 
                  </TextField>
                </Grid>
                <Grid size={3}>
                  <Button 
                    variant="outlined"
                    sx={{ height: '55px' }}
                    onClick={handleShareNote}
                  >
                    Share
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Grid>
            <Grid size={11}>
              <Item id="editor">
                <Box
                  component="form"
                  sx={{ '& .MuiTextField-root': { m: 1, width: '175ch' } }}
                  
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    inputRef={inputRef}
                    id="textField"
                    name="textField"
                    multiline
                    rows={20}
                    onChange={handleTextChanged}
                    disabled={!hasPermission} 
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
