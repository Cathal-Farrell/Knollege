'use client';
import { useEffect, useState } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function GroupInvites() {
  const [invites, setInvites] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  async function loadInvites(invitee) {
    const res = await fetch(
    "http://localhost:3000/api/getInvites?invitee=" + encodeURIComponent(invitee)
    );
    const data = await res.json();
    setInvites(data);
  }

  useEffect(() => {
    let intervalID;

    async function loadData() {
      const sessionRes = await fetch("http://localhost:3000/api/session");
      const sessionData = await sessionRes.json();

      setUserEmail(sessionData.email);
      await loadInvites(sessionData.email);
      intervalID = setInterval(() => {
        loadInvites(sessionData.email);
      }, 5000);
    }

    loadData();

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  let inviteContent;

  if (invites.length === 0) {
    inviteContent = (
    <Typography variant="body2">You have no invites right now.</Typography>
    );
  } else {
    inviteContent = invites.map((invite, index) => {
      return (
        <Paper
        key={invite._id}
        sx={{ padding: "12px", marginBottom: "8px" }}
        >

        <Typography sx={{ fontWeight: 600 }}>Invite {index + 1}</Typography>
        <Typography variant="body2">Chat name: {invite.chatName}</Typography>
        <Typography variant="body2">Chat ID: {invite.chatID}</Typography>
        <Typography variant="body2">Invited by: {invite.inviter}</Typography>
        </Paper>
        
      );
    });
  }

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
        {inviteContent}
      </Paper>
      <Paper sx={{ padding: "12px" }}>
        <Typography variant="body2">Signed in as: {userEmail}</Typography>
      </Paper>
    </Box>
  );
}
