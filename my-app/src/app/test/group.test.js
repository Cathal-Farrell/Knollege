import { runDBCallAsync as createChat} from '../createchat/page';
import { runDBCallAsync as loginAccount } from '../login/page';




test('Creating chat valid', async () => {

    // Mock alert
    global.alert = jest.fn();

    const chatName = "test chat";
    const chatID = "99752";
    const members = "test1@gmail.com,test2@gmail.com";

    const result = await fetch(`http://localhost:3000/api/newchat?chatName=${chatName}&chatID=${chatID}&members=${members}`)

    const data = await result.json();
    expect(data.data).toBe("valid");
})

test('Creating chat invalid', async () => {

    // Mock alert
    global.alert = jest.fn();

    const chatName = "test chat";
    const chatID = "99752";
    const members = "test1@gmail.com,test2@gmail.com";

    const result = await fetch(`http://localhost:3000/api/newchat?chatName=${chatName}&chatID=${chatID}&members=${members}`)

    const data = await result.json();
    expect(data.data).toBe("invalid");
})

test('Creating chat incomplete', async () => {

    // Mock alert
    global.alert = jest.fn();

    const chatName = "test chat";
    const chatID = "";
    const members = "test1@gmail.com,test2@gmail.com";

    const result = await fetch(`http://localhost:3000/api/newchat?chatName=${chatName}&chatID=${chatID}&members=${members}`)

    const data = await result.json();
    expect(data.data).toBe("incomplete");
})

test('Creating chat incompliant', async () => {

    // Mock alert
    global.alert = jest.fn();

    const chatName = "test chat";
    const chatID = "99753";
    const members = "test1,test2";

    const result = await fetch(`http://localhost:3000/api/newchat?chatName=${chatName}&chatID=${chatID}&members=${members}`)

    const data = await result.json();
    expect(data.data).toBe("incompliant");
})

test('Messaging chat', async () => {

    const text = "hello";
    const chatID = "99752";
    const userID = "test1@gmail.com";

    const result = await fetch(`http://localhost:3000/api/uploadmsg?text=${encodeURIComponent(text)}&chatID=${chatID}&userID=${userID}`)

    const data = await result.json();
    expect(data.data).toBe("valid");
})

test('Initial reading chat exists', async () => {

    const chatID = "99752";
    const userID = "test1@gmail.com";

    const result = await fetch(`http://localhost:3000/api/syncmsg?chatID=${chatID}&userID=${userID}`)

    const data = await result.json();
    expect(data.length).toBe(1);
})

test('Initial reading chat does not exists', async () => {

    const chatID = "99753";
    const userID = "test1@gmail.com";

    const result = await fetch(`http://localhost:3000/api/syncmsg?chatID=${chatID}&userID=${userID}`)

    const data = await result.json();
    expect(data.length).toBe(0);
})

test('Deleting chat exists', async () => {

    // Mock alert
    global.alert = jest.fn();

    const chatID = "99752";

    const result = await fetch(`http://localhost:3000/api/deletechat?chatID=${encodeURIComponent(chatID)}`)

    const data = await result.json();
    expect(data.data).toBe("valid");
})

test('Deleting chat does not exist', async () => {

    // Mock alert
    global.alert = jest.fn();

    const chatID = "99753";

    const result = await fetch(`http://localhost:3000/api/deletechat?chatID=${encodeURIComponent(chatID)}`)

    const data = await result.json();
    expect(data.data).toBe("not valid");
})