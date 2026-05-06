'use client';
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Paper, Typography, Button, Stack, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";

export default function GroupDetails() {

  const searchParams = useSearchParams();
  const chatID = searchParams.get("chatID");
  const userID = searchParams.get("userID");

const [chatName, setChatName] = useState(null);
const [chatAdmin, setChatAdmin] = useState("");
const [newChatName, setNewChatName] = useState("");
const [members, setMembers] = useState([]);
const [nameSaved, setNameSaved] = useState(false);
const [invitee, setInvitee] = useState("");
const [inviteSent, setInviteSent] = useState(false);

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
  //runs again if chatID changes 
}, [chatID]);

  async function handleUpdateChatName() {
    const res = await fetch(
      `http://localhost:3000/api/updatechatname?chatID=${encodeURIComponent(chatID)}&chatName=${encodeURIComponent(newChatName)}&userID=${encodeURIComponent(userID)}`
    );

    if (res.ok) {
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 300);
    }

    setChatName(newChatName);
  }

  async function handleRemoveMember(memberID) {
    await fetch(
      `http://localhost:3000/api/removegroupmember?chatID=${encodeURIComponent(chatID)}&memberID=${encodeURIComponent(memberID)}&userID=${encodeURIComponent(userID)}`
    );
// update local statee to remove member.
    setMembers((currentMembers) => currentMembers.filter((member) => member.id !== memberID));
  }

  async function handleSendInvite() {
    const res = await fetch(
      `http://localhost:3000/api/addInvite?chatID=${encodeURIComponent(chatID)}&invitee=${encodeURIComponent(invitee)}&inviter=${encodeURIComponent(userID)}&chatName=${encodeURIComponent(chatName)}`
    );
    // small animation when success
    if (res.ok) {
      setInviteSent(true);
      setTimeout(() => setInviteSent(false), 300);
    }
    //clear field 
    setInvitee("");
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
          <Stack direction="row" spacing={1} alignItems="center" sx={{ width: "100%" }}>
            <TextField
              label="Edit"
              size="small"
              fullWidth
              value={newChatName}
              onChange={(event) => setNewChatName(event.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button
              size="small"
              variant={nameSaved ? "contained" : "outlined"}
              color={nameSaved ? "success" : "primary"}
              onClick={handleUpdateChatName}
              aria-label="Save group name"
              sx={{ height: "39px", minWidth: "39px", width: "39px", padding: 0 }}
            >
              <SaveIcon fontSize="small" />
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
{/*puts red admin tag beside admin name*/}
        <Stack spacing={1}>
          {members.map((member) => {
            let displayName = member.name;
            let memberNameColor = "text.primary";

    
            if (member.id === chatAdmin) {
              displayName += " (Admin)";
              memberNameColor = "error.main";
            }

            return (
              <Paper key={member.id} sx={{ padding: "12px" }}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                  <div>
                    <Typography
                    sx={{
                    fontWeight: 600,
                    color: memberNameColor,
                    }}
                   >
                    {displayName}
                    </Typography>
                    <Typography variant="body2">{member.id}</Typography>
                  </div>
                  {/*lets only admin remove others*/}
                  {userID === chatAdmin && member.id !== chatAdmin ? (
                  <Button variant="outlined" color="error" onClick={() => handleRemoveMember(member.id)}>
                  Remove
                  </Button>
                ) : null}
            </Stack>
            </Paper>
            );
          })}
        </Stack>
      </Paper>

      {userID === chatAdmin && (
        <Paper
          sx={{
            padding: "16px",
            marginBottom: "24px",
            marginTop: "24px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            Invite Members
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ width: "100%" }}>
            <TextField
              label="Email"
              size="small"
              fullWidth
              value={invitee}
              onChange={(event) => setInvitee(event.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button
              size="small"
              variant={inviteSent ? "contained" : "outlined"}
              color={inviteSent ? "success" : "primary"}
              onClick={handleSendInvite}
              aria-label="Send invite"
              sx={{ height: "39px", minWidth: "39px", width: "39px", padding: 0 }}
            >
              <SendIcon fontSize="small" />
            </Button>
          </Stack>
        </Paper>
      )}

      <Paper
        sx={{
        padding: "12px",
        marginTop: "24px",
        }}
      >
        <Typography variant="body2">Chat ID: {chatID}</Typography>
      </Paper>

      <Paper
        sx={{
        padding: "12px",
        marginTop: "12px",
        }}
      >
        <Typography variant="body2">Signed in as: {userID}</Typography>
      </Paper>
    </Box>
  );
}