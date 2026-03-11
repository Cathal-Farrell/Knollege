"use client";

import { Box, Paper, Typography, Avatar, TextField, Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export default function ProfilePage() {
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
            "&:hover": {
            backgroundColor: "#1565c0",
            transform: "scale(1.03)"
            },
            "&:active": {
            backgroundColor: "#0d47a1"
            }
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

          {/* Name */}
          <TextField fullWidth label="Display Name" defaultValue="Vlad" />

          {/* Email */}
          <TextField fullWidth label="Email" defaultValue="vlad@example.com" />

          {/* Bio */}
          <TextField
            fullWidth
            label="Bio"
            multiline
            rows={3}
            placeholder="Write something about yourself..."
          />

          {/* Save Button */}
          <Button variant="contained" size="large" sx={{ width: "100%" }}>
            Save Changes
          </Button>

        </Stack>
      </Paper>
    </Box>
  );
}
