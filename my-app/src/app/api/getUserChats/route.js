export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const userID = searchParams.get("userID");

    const { MongoClient } = require("mongodb");
    const client = new MongoClient("mongodb://root:example@localhost:27017/");
    await client.connect();

    const db = client.db("app");
    const chats = db.collection("chats");

    const result = await chats.find({ userID }).toArray();

    return Response.json(result);
}
