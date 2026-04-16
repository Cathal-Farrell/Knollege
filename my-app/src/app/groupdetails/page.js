'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Paper, Typography, Button, Stack, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function GroupDetails() {

  const searchParams = useSearchParams();
  const chatID = searchParams.get("chatID");
  const userID = searchParams.get("userID");

const [chatName, setChatName] = useState(null);
const [chatAdmin, setChatAdmin] = useState("");
const [newChatName, setNewChatName] = useState("");
const [members, setMembers] = useState([]);

 useEffect(() => {
  async function loadGroup() {
    //fetch chat details
    const res = await fetch(
      "http://localhost:3000/api/getchatmembers?chatID=" + encodeURIComponent(chatID)
    );
    const data = await res.json();

  setChatName(data.chatName);
    setChatAdmin(data.admin || "");
    setNewChatName(data.chatName || "");
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

  async function handleUpdateChatName() {
    await fetch(
      `http://localhost:3000/api/updatechatname?chatID=${encodeURIComponent(chatID)}&chatName=${encodeURIComponent(newChatName)}&userID=${encodeURIComponent(userID)}`
    );
    setChatName(newChatName);
  }

  async function handleRemoveMember(memberID) {
    await fetch(
      `http://localhost:3000/api/removegroupmember?chatID=${encodeURIComponent(chatID)}&memberID=${encodeURIComponent(memberID)}&userID=${encodeURIComponent(userID)}`
    );

    setMembers((currentMembers) => currentMembers.filter((member) => member.id !== memberID));
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
        {userID === chatAdmin ? (
          <Stack spacing={1}>
            <TextField
              size="small"
              value={newChatName}
              onChange={(event) => setNewChatName(event.target.value)}
            />
            <Button variant="outlined" onClick={handleUpdateChatName}>
              Save
            </Button>
          </Stack>
        ) : (
          <Typography>{chatName}</Typography>
        )}
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
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <div>
                  <Typography sx={{ fontWeight: 600 }}>{member.name}</Typography>
                  <Typography variant="body2">{member.id}</Typography>
                </div>
                {userID === chatAdmin && member.id !== chatAdmin ? (
                  <Button variant="outlined" color="error" onClick={() => handleRemoveMember(member.id)}>
                    Remove
                  </Button>
                ) : null}
              </Stack>
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