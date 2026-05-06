"use client";
import {useEffect, useState} from "react";
import { Box, Paper, Typography, Avatar, TextField, Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from '@/components/NavBar';

export default function ProfilePage() {

    const [profile, setProfile] = useState({ profilePicture: "" });
    const [sessionEmail, setSessionEmail] = useState(null);

    useEffect(() => {
        async function loadProfile() {

            const res = await fetch('/api/session');

            const data = await res.json();

            if (data.email && data.email !== "Not Logged In") 
            {
                setSessionEmail(data.email);
                const profileRes = await fetch(`/api/getProfile?userID=${encodeURIComponent(data.email)}`);
                const profileData = await profileRes.json();
                setProfile({ ...profileData, email: profileData.email || data.email });
            }
        }
        loadProfile();
    }, []);

    const handleSave = () => {
    fetch(`/api/updateProfile?userID=${encodeURIComponent(sessionEmail)}&displayName=${profile.displayName}&email=${profile.email}
        &bio=${profile.bio}&age=${profile.age}&school=${profile.school}`)
        .then(res => res.json())
        .then(data => {
        console.log("Profile updated:", data);
        alert("Profile saved!");
        });
    };

  return (
    
    <Box sx={{ mt: 3, mb: 2 }}>
        <Navbar />
        
        <Box sx={{ p: 2, maxWidth: 480, mx: "auto" }}>
        
        <Button
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: 600,
            borderRadius: 2,
            px: 2.5,
            mb: 2,
            "&:hover": { backgroundColor: "#1565c0", transform: "scale(1.03)"},
            "&:active": { backgroundColor: "#0d47a1"}
        }}
        >
        Back to Dashboard
        </Button>
    

      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}>
        Profile
      </Typography>

      {/* Profile Card */}
       <Paper elevation={6} 
            sx={{ 
                p: 3, 
                borderRadius: 4, 
                display: "flex", 
                justifyContent: "center" 
            }}
        >
        <Stack spacing={2} alignItems="center" sx={{ width: "88%"}}>
          {/* Avatar */}
          <Avatar 
            sx={{ 
                width: 70, 
                height: 70,
                border: "2px solid #1976d2",
                boxShadow: "0 0 10px rgba(25,118,210,0.6)",
            }} 
            />


        <TextField
            fullWidth
            label="Display Name"
            value={profile.displayName || ""}
            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
        />

        <TextField
            fullWidth
            label="Email"
            value={sessionEmail || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            disabled={true}
        />

        <TextField
            fullWidth
            label="Age (optional)"
            type="number"
            value={profile.age || ""}
            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
        />

        <TextField
            fullWidth
            label="School (optional)"
            value={profile.school || ""}
            onChange={(e) => setProfile({ ...profile, school: e.target.value })}
        />


        <TextField
            fullWidth
            label="Bio"
            multiline
            rows={3}
            value={profile.bio || ""}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />

        
            {/* Save Button */}
            <Button 
                variant="contained" 
                size="medium" 
                sx={{ width: "80%", py: 1.2, borderRadius: 3}}
                onClick={handleSave}
            >
                Save Changes
            </Button>
        

        </Stack>
      </Paper>
      </Box>
    </Box>
  );
}
