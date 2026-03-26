"use client";
import {useEffect, useState} from "react";
import { Box, Paper, Typography, Avatar, TextField, Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export default function ChatDetails() {

    const [data, setData] = useState(null)
    const userIDRef = React.useRef(null);
    
    React.useEffect(() => {
            handleSearchMembers()
            const intervalID = setInterval(() => {
                handleSearchMembers()
                
            }, 5000);
        
            // Cleanup interval when component unmounts
            return () => clearInterval(intervalID);
        }, []);

    function handleSearchMembers(url) {
        console.log("handling member search");

        const inputUserID = userIDRef.current?.value;
        runDBCallAsync(`http://localhost:3000/api/getchatmembers?userID=${inputUserID}`);
    }

    async function runDBCallAsync(url) {

        const res = await fetch(url)
        
                .then((res) => res.json())

                .then((data) => {

                setData(data)

            })



        if(data != null){

            console.log("Files found!")

        } else {

            console.log("no files  ")

        }

    }

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
                    label="User" 
                    variant="outlined" 
                    defaultValue={userIDRef.current?.value || "100"}
                    inputRef={userIDRef}/>
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
                    <div><strong>{item.userName}</strong></div>
                    
                    <div>ID: {item.userID}</div>
                  </div>
                    
                    {console.log(item.userID)}

                    <Button 
                    variant="outlined" 
                    href={`/profile?chatID=${encodeURIComponent(item.chatID)}&userID=${encodeURIComponent(userIDRef.current?.value || "100")}`}> 
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
