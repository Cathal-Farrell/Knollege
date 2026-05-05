export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const chatID = searchParams.get("chatID");
    const invitee = searchParams.get("invitee");
    const inviter = searchParams.get("inviter");
    const chatName = searchParams.get("chatName");

    const { MongoClient } = require("mongodb");
    const client = new MongoClient("mongodb://root:example@localhost:27017/");
    await client.connect();

    const db = client.db("app");
    const invites = db.collection("invites");

    await invites.insertOne(
        { chatID, invitee, inviter, chatName }
    );

    return Response.json({ status: "ok" });
}
