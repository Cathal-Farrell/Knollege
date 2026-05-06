var testChatID;
var testInviteId;

const testAdmin = "inviteadmin@test.com";
const testInvitee = "invitee@test.com";
const testChatName = "invite test chat";

test('Creating test chat', async () => {

    // Mock alert
    global.alert = jest.fn();

    const result = await fetch(`http://localhost:3000/api/newchat?chatName=${testChatName}&members=${testAdmin}&admin=${testAdmin}`)

    const data = await result.json();
    expect(data.data).toBe("valid");
    testChatID = data.chatID;
})

test('Sending invite', async () => {

    const result = await fetch(`http://localhost:3000/api/addInvite?chatID=${testChatID}&invitee=${encodeURIComponent(testInvitee)}&inviter=${encodeURIComponent(testAdmin)}&chatName=${encodeURIComponent(testChatName)}`)

    const data = await result.json();
    expect(data.status).toBe("ok");
})

test('Get invites returns sent invite', async () => {

    const result = await fetch(`http://localhost:3000/api/getInvites?invitee=${encodeURIComponent(testInvitee)}`)

    const data = await result.json();
    const invite = data.find(i => i.chatID === testChatID);
    expect(invite).toBeDefined();
    expect(invite.inviter).toBe(testAdmin);
    testInviteId = invite._id;
})

test('Accepting invite', async () => {

    const result = await fetch(`http://localhost:3000/api/chatInvite?inviteId=${testInviteId}&chatID=${testChatID}&email=${encodeURIComponent(testInvitee)}`)

    const data = await result.json();
    expect(data.data).toBe("valid");
})

test('After accepting, invitee is in chat', async () => {

    const result = await fetch(`http://localhost:3000/api/getchatmembers?chatID=${testChatID}`)

    const data = await result.json();
    expect(data.userID).toContain(testInvitee);
})

test('After accepting, invite is gone', async () => {

    const result = await fetch(`http://localhost:3000/api/getInvites?invitee=${encodeURIComponent(testInvitee)}`)

    const data = await result.json();
    const invite = data.find(i => i.chatID === testChatID);
    expect(invite).toBeUndefined();
})

test('Deleting test chat', async () => {

    // Mock alert
    global.alert = jest.fn();

    const result = await fetch(`http://localhost:3000/api/deletechat?chatID=${encodeURIComponent(testChatID)}`)

    const data = await result.json();
    expect(data.data).toBe("valid");
})
