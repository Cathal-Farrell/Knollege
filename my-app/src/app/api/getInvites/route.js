export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const chatID = searchParams.get("chatID");

    const { MongoClient } = require("mongodb");
    const client = new MongoClient("mongodb://root:example@localhost:27017/");
    await client.connect();

    const db = client.db("app");
    const chats = db.collection("chats");

    const chat = await chats.findOne({ chatID });

    return Response.json({
        invites: chat?.invites || []
    });
}
