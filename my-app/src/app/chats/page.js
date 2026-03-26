'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';



export default function BasicGrid() {

    const [data, setData] = useState(null)
    const [userEmail, setUserEmail] = useState("100");
    const userIDRef = React.useRef(null);

    React.useEffect(() => {

       async function fetchSession() {
            const res = await fetch('http://localhost:3000/api/session');
            const sessionData = await res.json();
            if (sessionData.email !== "Not Logged In") {
            setUserEmail(sessionData.email);
            }
        }
        fetchSession();

      
        handleSearchChat()
        const intervalID = setInterval(() => {
            handleSearchChat()
            
        }, 5000);
    
        // Cleanup interval when component unmounts
        return () => clearInterval(intervalID);
    }, []);
      
    function handleSearchChat(url) {
        console.log("handling chat search");

        const inputUserID = userIDRef.current?.value;
        runDBCallAsync(`http://localhost:3000/api/searchchat?userID=${inputUserID}`);
    }

    async function runDBCallAsync(url) {

        const res = await fetch(url)
        
                .then((res) => res.json())

                .then((data) => {

                setData(data)

            })



        if(data != null){

            console.log("Chats found!")

        } else {

            console.log("no chats  ")

        }

    }

    if (!data) return <p>Loading</p>

    async function handleDeleteChat(chatID) {
    if (!window.confirm("Delete this chat?")) return;

    await fetch(`http://localhost:3000/api/deletechat?chatID=${encodeURIComponent(chatID)}`);
    handleSearchChat(); 
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
        <Grid size={8}>
          {

                data.map((item, i) => (

                <div style={{
                  padding: '20px',
                  borderBottom: '1px solid #ddd',
                  display : 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'Arial, sans-serif'
                }} key={i} >

                  <div>
                    <div><strong>{item.chatName}</strong></div>
                    
                    <div>members: {(item.userID || []).join(', ')}</div>

                    <div>chatID: {item.chatID}</div>
                  </div>
                    
                    {console.log(item.userID)}

                    <Button 
                    variant="outlined" 
                    href={`/message?chatID=${encodeURIComponent(item.chatID)}&userID=${encodeURIComponent(userIDRef.current?.value || "100")}`}> 
                    Message 
                    </Button>

                    <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteChat(item.chatID)}>
                    {<DeleteIcon />}
                    
                    </Button>
                </div>

                ))

            }
        </Grid>
        <Grid size={2}>
          <Item>
            <Button variant="outlined" href="/createchat"> New Chat </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}