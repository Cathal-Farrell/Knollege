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
// table (vlad)
import Table from '@mui/material/Table'; 
import TableBody from '@mui/material/TableBody';  
import TableCell from '@mui/material/TableCell'; 
import TableContainer from '@mui/material/TableContainer';  
import TableHead from '@mui/material/TableHead';  
import TableRow from '@mui/material/TableRow';

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
          <MenuItem href="/profile">
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem component="a" href="/login">
           <ListItemIcon> <PersonAdd fontSize="small" /> 
           </ListItemIcon> 
           Login 
           </MenuItem>
           <MenuItem component="a" href="/signup">
           <ListItemIcon> <PersonAdd fontSize="small" /> 
           </ListItemIcon> 
           Register 
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

      {/*Home */}
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Dashboard
      </Typography>
      <Divider sx={{ my: 2 }} />

      {/* FLEX CONTAINER — LEFT SIDEBAR + RIGHT NEW FILES */}
      <Box sx={{ display: "flex", gap: 6, alignItems: "flex-start" }}>

        {/* LEFT SIDEBAR */}
        <Box sx={{ width: "180px" }}>
          <Stack direction="column" spacing={2}>
            <Button
              variant="contained"
              color="white"
              startIcon={<FolderIcon />}
              href="/editor"
            >
              Open Folder
            </Button>

            <Button
              variant="contained"
              color="white"
              startIcon={<FileOpenIcon />}
              href="/editor"
            >
              Open File
            </Button>

            <Divider />

            <Button variant="outlined" startIcon={<ChatIcon />} href="/chats">
              Message
            </Button>
          </Stack>
        </Box>

        {/* RIGHT SIDE — NEW FILES SECTION */}
        <Box sx={{ flexGrow: 1 }}>

          <Typography
            variant="h6"
            sx={{
              mt: 0.1,
              mb: 1,
              fontWeight: 600,
              marginLeft: 16,
            }}
          >
            New +
          </Typography>

          <Grid
            container
            spacing={4}
            sx={{ mb: 15 }}
            justifyContent="center"
            marginLeft={-25}
          >
            {[
              { title: "Blank Document", icon: <FileOpenIcon />, link: "/editor", onClick: "handleSearchFile()" },
              { title: "Formatted Document", icon: <FolderIcon />, link: "/formatteddoc" },
              { title: "Colourful Document", icon: <AddCircleIcon />, link: "/colordoc" },
              { title: "Ghannt Chart Document", icon: <HomeIcon />, link: "/ghanttdoc" },
            ].map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box component="a" href={item.link} sx={{ textDecoration: "none" }}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      textAlign: "center",
                      cursor: "pointer",
                      borderRadius: 2,
                      transition: "0.2s",
                      backgroundColor: "white",
                      "&:hover": {
                        transform: "scale(1.03)",
                        backgroundColor: "#e3f2fd"
                      },
                      "&:active": {
                        backgroundColor: "#5ba8e8"
                      }
                    }}
                  >
                    <Box sx={{ fontSize: 40, mb: 1, color: "primary.main" }}>
                      {item.icon}
                    </Box>

                    <Typography sx={{ fontWeight: 600, color: "text.primary" }}>
                      {item.title}
                    </Typography>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
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
          {data.map((item, i) => (
            <Paper
              key={i}
              elevation={3}
              sx={{
                p: 3,
                mb: 2,
                marginLeft: 1 ,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 2,
                transition: "0.2s",
                "&:hover": { transform: "scale(1.03)",backgroundColor: "#e3f2fd"},
                "&:active": { backgroundColor: "#5ba8e8"},
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>
                  {item.noteID}
                </Typography>

                <Typography sx={{ fontSize: "0.85rem", color: "text.secondary" }}>
                  User: {item.userID}
                </Typography>
              </Box>

              {/* RIGHT SIDE: Delete button */}
              <Button variant="outlined" onClick={() => deleteFile()}>
                Delete
              </Button>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}