export async function GET(req) {
    
  const { searchParams } = new URL(req.url);
  const chatID = searchParams.get("chatID");
  const memberID = searchParams.get("memberID");
  const userID = searchParams.get("userID");
  const { MongoClient } = require("mongodb");

  const client = new MongoClient("mongodb://root:example@localhost:27017/");

  await client.connect();
  const db = client.db("app");
  const collection = db.collection("chats");

  const chat = await collection.findOne({ chatID });

  await collection.updateOne(
    { chatID },
    { $pull: { userID: memberID } }
  );

  return Response.json({ data: "valid" });
}