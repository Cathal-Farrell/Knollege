'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';



export default function BasicGrid() {

    const [data, setData] = useState(null)
    const [userEmail, setUserEmail] = useState("100");
    const userEmailRef = React.useRef(null);
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

    // Update ref whenever userEmail changes
        React.useEffect(() => {
          userEmailRef.current = userEmail;
        }, [userEmail]);
      
    function handleSearchChat(url) {
        console.log("handling chat search");

        runDBCallAsync(`http://localhost:3000/api/searchchat?userID=${userEmailRef.current}`);
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
        <Grid size={6} sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <Typography component="a" href="/" sx={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.2, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
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
                  </div>
                    
                    {console.log(item.userID)}

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Button 
                    variant="outlined" 
                    aria-label="Open chat message"
                    sx={{ minWidth: 48, width: 48, height: 48,
                     color: '#0b5d1e', borderColor: '#0b5d1e', 
                    
                    '&:hover': { borderColor: '#05250b',
                     backgroundColor: 'rgba(11, 93, 30, 0.08)' } }}
                    href={`/message?chatID=${encodeURIComponent(item.chatID)}&userID=${encodeURIComponent(userEmailRef.current)}`}>
                    {<ChatBubbleOutlineIcon />}
                    </Button>

                    <Button
                    variant="outlined"
                    sx={{ minWidth: 48, width: 48, height: 48 }}
                    href={`/groupdetails?chatID=${encodeURIComponent(item.chatID)}&userID=${encodeURIComponent(userEmailRef.current)}`}>
                    {<InfoOutlinedIcon />}
                    </Button>

                    <Button
                    variant="outlined"
                    color="error"
                    sx={{ minWidth: 48, width: 48, height: 48 }}
                    onClick={() => handleDeleteChat(item.chatID)}>
                    {<DeleteIcon />}
                    
                    </Button>
                    </div>
                </div>

                ))

            }
        </Grid>
        <Grid size={2}>
          <Item>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button variant="outlined" href="/createchat"> New Chat </Button>
              <Button variant="outlined" href="/groupinvites"> Chat Invites </Button>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}