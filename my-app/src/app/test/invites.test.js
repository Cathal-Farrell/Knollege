var testChatID;

var testInviteId;
const testAdmin = "inviteadmin@test.com";
const testInvitee = "invitee@test.com";
const testChatName = "invite test chat";

test('create test chat', async () => {
    const result = await fetch(
    `http://localhost:3000/api/newchat?chatName=${testChatName}&members=${testAdmin}&admin=${testAdmin}`
    );

    const data = await result.json();
    expect(data.data).toBe("valid");
    testChatID = data.chatID;
});

test('sending invite', async () => {
    const result = await fetch(
    `http://localhost:3000/api/addInvite?chatID=${testChatID}&invitee=${encodeURIComponent(testInvitee)}&inviter=${encodeURIComponent(testAdmin)}&chatName=${encodeURIComponent(testChatName)}`
    );

    const data = await result.json();
    expect(data.status).toBe("ok");
});

test('get invites returns sent invite', async () => {
    const result = await fetch(
    `http://localhost:3000/api/getInvites?invitee=${encodeURIComponent(testInvitee)}`
    );

    const data = await result.json();
    const invite = data.find(i => i.chatID === testChatID);
    expect(invite).toBeDefined();
    expect(invite.inviter).toBe(testAdmin);
    testInviteId = invite._id;
});

test('accepting invite', async () => {
    const result = await fetch(
    `http://localhost:3000/api/acceptInvite?inviteId=${testInviteId}&chatID=${testChatID}&email=${encodeURIComponent(testInvitee)}`
    );

    const data = await result.json();
    expect(data.status).toBe("ok");
});

test('after accepting, invitee is in chat', async () => {
    const result = await fetch(
    `http://localhost:3000/api/getchatmembers?chatID=${testChatID}`
    );

    const data = await result.json();
    expect(data.userID).toContain(testInvitee);
});

test('after accepting, invite is gone', async () => {
    const result = await fetch(
    `http://localhost:3000/api/getInvites?invitee=${encodeURIComponent(testInvitee)}`
    );

    const data = await result.json();
    const invite = data.find(i => i.chatID === testChatID);
    expect(invite).toBeUndefined();
});

test('delete test chat', async () => {
    const result = await fetch(
    `http://localhost:3000/api/deletechat?chatID=${encodeURIComponent(testChatID)}`
    );
    
    const data = await result.json();
    expect(data.data).toBe("valid");
});
