export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const inviteId = searchParams.get("inviteId");
    const chatID = searchParams.get("chatID");
    const email = searchParams.get("email");

    const { MongoClient, ObjectId } = require("mongodb");
    const client = new MongoClient("mongodb://root:example@localhost:27017/");
    await client.connect();

    const db = client.db("app");
    await db.collection("chats").updateOne(
        { chatID },
        { $addToSet: { userID: email } }
    );
// deletes after u accept
    await db.collection("invites").deleteOne({ _id: new ObjectId(inviteId) });
    return Response.json({ status: "ok" });
}
