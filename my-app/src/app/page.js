'use client';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
// new (vlad)
// avatar
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// icons (vlad)
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home'; 
import LoginIcon from '@mui/icons-material/Login';
import ChatIcon from '@mui/icons-material/Chat';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import FileOpenIcon from '@mui/icons-material/FileOpen';

import { useState, useEffect } from 'react';


export default function BasicGrid() {

    const [data, setData] = useState(null)
    const userIDRef = React.useRef(null);

    // Avatar menu state (https://mui.com/material-ui/react-menu/#account-menu)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleAvatarClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleAvatarClose = () => {
      setAnchorEl(null);
    };


    React.useEffect(() => {
        handleSearchFile()
        const intervalID = setInterval(() => {
            handleSearchFile()
            
        }, 5000);
    
        // Cleanup interval when component unmounts
        return () => clearInterval(intervalID);
    }, []);
      
    function handleSearchFile(url) {
        console.log("handling file search");

        const inputUserID = userIDRef.current?.value;
        runDBCallAsync(`http://localhost:3000/api/searchfiles?userID=${inputUserID}`);
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

    if (!data) return <p>Loading</p>
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
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* // Avatar menu state (https://mui.com/material-ui/react-menu/#account-menu) VLAD*/}
      <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleAvatarClick} size="small" sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>

        <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleAvatarClose} onClick={handleAvatarClose} slotProps={{ paper: { elevation: 0, sx: { overflow: 'visible', filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', mt: 1.5, '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1, }, '&::before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0, }, }, }, }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} >
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem component="a" href="/login">
           <ListItemIcon> <PersonAdd fontSize="small" /> 
           </ListItemIcon> 
           Login 
           </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small"/>
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>

      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
       Dashboard
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ width: '180px', pr: 2 }}>
          <Stack direction="column" spacing={2}>
             <Button variant="contained" color="primary" startIcon={<AddCircleIcon />}
              href="/editor">
              New File
            </Button>
            <Button variant="contained" color="white" startIcon={<FolderIcon/>}
              href="/editor">
              Open Folder
            </Button>
            <Button variant="contained" color="white" startIcon={<FileOpenIcon/>}
              href="/editor">
              Open File
            </Button>
            <Divider />
            <Button variant="outlined" startIcon={<ChatIcon />} href="/chats">Message</Button>
          </Stack>
        </Box>




      <Grid container spacing={2}>
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
            {console.log()}
          </Item>
        </Grid>
        <Grid size={8}>
          {

                data.map((item, i) => (

                <div style={{padding: '20px'}} key={i} >

                    fileID: {item.noteID}

                    ---

                    userID: {item.userID + ""}

                    {console.log(item.userID)}

                    <Button variant="outlined" href="/editor"> Edit </Button>

                </div>

                ))

            }
        </Grid>
      </Grid>
    </Box>
  );
}