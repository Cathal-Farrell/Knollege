'use client';

import React, { useEffect, useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Button, Avatar, Divider, ListItemIcon, Tooltip, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch('/api/sessionEmail');
      const data = await res.json();
      if (data.email !== "Not Logged In") {
        setUserEmail(data.email);
      }
    }
    fetchSession();
  }, []);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleAvatarClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    handleAvatarClose();
    await fetch('/api/logout');
    window.location.href = "/login";
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: 30,            
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          position: 'relative'
        }}
      >
        <Typography
          component="a"
          href="/"
          sx={{
            fontSize: '38px',
            fontWeight: 700,
            textDecoration: 'none',
            color: 'black',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            ml: 2,
            textShadow: '0px 1px 4px rgba(6, 32, 54, 0.31)',
            "&:hover": {
             transform: "scale(1.03)",
             },
             transition: "0.5s", 
          }}
        >
          Knollege📄
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 133 }}>

          <Button 
            variant="outlined" 
            sx={{ 
              width: 150, 
              height: 45, 
              fontSize: '16px',
              border: '1px solid #1976d2',
              boxShadow: '0px 3px 6px rgba(5, 57, 91, 0.49)',
              "&:hover": {
                transform: "scale(1.03)",
                backgroundColor: "#e3f2fd"
                },
                transition: "0.5s",
                backgroundColor: "#ffffff",
            }} 
            startIcon={<ChatIcon />} 
            href="/chats"
          >
            Messages
          </Button>

          <Tooltip title="Account settings">
            <IconButton 
                onClick={handleAvatarClick} 
                size="small"
            >
              <Avatar 
                sx={{ 
                    width: 40, 
                    height: 40,
                    border: '1px solid #1976d2',
                    boxShadow: '0 0 6px rgba(25,118,210,0.6)',
                    "&:hover": {
                    transform: "scale(1.03)",
                    backgroundColor: "#666666"
                    },
                    transition: "0.5s",
                }}
                >
                {userEmail && userEmail[0].toUpperCase()}
                </Avatar>

            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleAvatarClose}
            onClick={handleAvatarClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >

            <MenuItem component="a" href="/profile">
              <Avatar /> Profile
            </MenuItem>

            <Divider />

            <MenuItem component="a" href="/login">
              <ListItemIcon><PersonAdd fontSize="small" /></ListItemIcon>
              Login
            </MenuItem>

            <MenuItem component="a" href="/signup">
              <ListItemIcon><PersonAdd fontSize="small" /></ListItemIcon>
              Register
            </MenuItem>

            {userEmail && (
              <MenuItem onClick={handleLogout}>
                <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                Logout
              </MenuItem>
            )}

          </Menu>
        </Box>
      </Box>

      <Divider />
    </>
  );
}
