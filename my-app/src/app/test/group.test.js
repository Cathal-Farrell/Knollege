import { runDBCallAsync as createChat} from '../createchat/page';
import { runDBCallAsync as loginAccount } from '../login/page';




test('Creating chat', async () => {

    // Mock alert
    global.alert = jest.fn();

    const chatName = "test chat";
    const chatID = "99752";
    const members = "test1@gmail.com,test2@gmail.com";

    const result = await fetch(`http://localhost:3000/api/newchat?chatName=${chatName}&chatID=${chatID}&members=${members}`)

    const data = await result.json();
    expect(data.data).toBe("valid");
})

test('Messaging chat', async () => {

    const text = "hello";
    const chatID = "99752";
    const userID = "test1@gmail.com";

    const result = await fetch(`http://localhost:3000/api/uploadmsg?text=${encodeURIComponent(text)}&chatID=${chatID}&userID=${userID}`)

    const data = await result.json();
    expect(data.data).toBe("valid");
})

test('Initial reading chat', async () => {

    const chatID = "99752";
    const userID = "test1@gmail.com";

    const result = await fetch(`http://localhost:3000/api/syncmsg?chatID=${chatID}&userID=${userID}`)

    const data = await result.json();
    expect(data.length).toBe(1);
})

test('Deleting chat', async () => {

    // Mock alert
    global.alert = jest.fn();

    const chatID = "99752";

    const result = await fetch(`http://localhost:3000/api/deletechat?chatID=${encodeURIComponent(chatID)}`)

    const data = await result.json();
    expect(data.data).toBe("valid");
})