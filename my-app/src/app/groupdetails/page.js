'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function GroupDetails() {

  const searchParams = useSearchParams();
  const chatID = searchParams.get("chatID");
  const userID = searchParams.get("userID");

const [chatName, setChatName] = useState(null);
const [members, setMembers] = useState([]);

 useEffect(() => {
  async function loadGroup() {
    //fetch chat details
    const res = await fetch(
      "http://localhost:3000/api/getchatmembers?chatID=" + encodeURIComponent(chatID)
    );
    const data = await res.json();

  setChatName(data.chatName);
    let memberList = data.userID;
    const memberData = [];

    //loop through each profile to get emaiil or username
    for (const memberEmail of memberList) {
      const profileRes = await fetch(
        "http://localhost:3000/api/getProfile?userID=" + encodeURIComponent(memberEmail)
      );
      const profileData = await profileRes.json();
      memberData.push({
        id: memberEmail,
      //if  username is set itll use it, otherwise use email
      name: profileData.displayName || profileData.email || memberEmail,
      });
    }
    setMembers(memberData);
  }

  loadGroup();
}, [chatID]);

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
        Group Details
      </Typography>

      <Paper
        sx={{
        padding: "16px",
        marginBottom: "24px",
        }}
      >
        <Typography
          sx={{
          fontSize: "20px",
          fontWeight: 600,
          marginBottom: "8px",
          }}
        >
          Group Name
        </Typography>
        <Typography>{chatName}</Typography>
      </Paper>

      <Paper
        sx={{
          padding: "16px",
        }}
      >
        <Typography
          sx={{
          fontSize: "20px",
          fontWeight: 600,
          marginBottom: "16px",
          }}
        >
          Members
        </Typography>

        <Typography
          sx={{
            marginBottom: "16px",
          }}
        >
          Chat ID: {chatID}
        </Typography>

        <Stack spacing={1}>
          {members.map((member) => (
            <Paper key={member.id} sx={{ padding: "12px" }}>
              <Typography sx={{ fontWeight: 600 }}>{member.name}</Typography>
              <Typography variant="body2">{member.id}</Typography>
            </Paper>
          ))}
        </Stack>
      </Paper>

      <Paper
        sx={{
        padding: "12px",
        marginTop: "24px",
        }}
      >
        <Typography variant="body2">Signed in as: {userID}</Typography>
      </Paper>
    </Box>
  );
}