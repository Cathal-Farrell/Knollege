export async function GET(req) {
    
  const { searchParams } = new URL(req.url);
  const chatID = searchParams.get("chatID");
  const chatName = searchParams.get("chatName");
  const userID = searchParams.get("userID");
  const { MongoClient } = require("mongodb");

  const client = new MongoClient("mongodb://root:example@localhost:27017/");

  await client.connect();
  const db = client.db("app");
  const collection = db.collection("chats");

  const chat = await collection.findOne({ chatID });

    await collection.updateOne(
        { chatID },
        { $set: { chatName } }
    );

  return Response.json({ data: "valid" });
}