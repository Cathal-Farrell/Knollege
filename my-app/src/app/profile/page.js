"use client";
import {useEffect, useState} from "react";
import { Box, Paper, Typography, Avatar, TextField, Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export default function ProfilePage() {
    const [profile, setProfile] = useState({theme: "system", profilePicture: "" });

    useEffect(() => {
        fetch(`/api/getProfile?userID=testUser`)
        .then(res => res.json())
        .then(data => setProfile(data));
    }, []);

    const handleSave = () => {
    fetch(`/api/updateProfile?userID=testUser&displayName=${profile.displayName}&email=${profile.email}
        &bio=${profile.bio}&age=${profile.age}&school=${profile.school}`)
        .then(res => res.json())
        .then(data => {
        console.log("Profile updated:", data);
        alert("Profile saved!");
        });
    };

  return (

    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>

        <Button
        href="/"
        startIcon={<ArrowBackIcon />}
        sx={{
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: 600,
            borderRadius: 2,
            px: 2.5,
            "&:hover": { backgroundColor: "#1565c0", transform: "scale(1.03)"},
            "&:active": { backgroundColor: "#0d47a1"}
        }}
        >
        Back to Dashboard
        </Button>
    

      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, textAlign: "center" }}>
        Profile
      </Typography>

      {/* Profile Card */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Stack spacing={3} alignItems="center">
          {/* Avatar */}
          <Avatar sx={{ width: 100, height: 100 }} />

        <TextField
            fullWidth
            label="Display Name"
            value={profile.displayName || ""}
            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
        />

        <TextField
            fullWidth
            label="Email"
            value={profile.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
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
        <Button variant="contained" size="large" sx={{
            width: "100%" }}
            onClick={handleSave}
        >
            Save Changes
        </Button>

        </Stack>
      </Paper>
    </Box>
  );
}
