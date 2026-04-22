'use client';
import { Box, Paper, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function GroupInvites() {
  return (
    <Box
      sx={{
        padding: "24px",
        maxWidth: "800px",
        margin: "0 auto",
         }}
        >
      <Button
        href="/chats"
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{
        marginBottom: "24px",
        }}
      >
        Back
      </Button>


      <Typography
        sx={{
        fontSize: "32px",
        fontWeight: 700,
        marginBottom: "24px",
        }}
      >
        Groupchat Invites
      </Typography>

      <Paper
        sx={{
        padding: "16px",
        marginBottom: "16px",
        }}
      >
        <Typography
          sx={{
        fontSize: "20px",
        fontWeight: 600,
        marginBottom: "8px",
          }}
        >
          Pending Invites
        </Typography>
        <Typography variant="body2">No invites yet.</Typography>
      </Paper>
        <Paper sx={{ padding: "12px" }}>
        <Typography variant="body2">Invites will go here</Typography>
        </Paper>
    </Box>
  );
}
