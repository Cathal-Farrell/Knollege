export async function GET(req) {

    // Make a note we are on

    // the api. This goes to the console.

    console.log("in the api page")

    // get the values

    // that were sent across to us.

    const { searchParams } = new URL(req.url);

    const chatID = searchParams.get("chatID");
    
    const noteID = searchParams.get("noteID");


    const { MongoClient } = require("mongodb");
    const client = new MongoClient("mongodb://root:example@localhost:27017/");
    await client.connect();

    const db = client.db("app");
    const chats = db.collection("chats");

    await chats.updateOne(
        { chatID },
        { $push: { notes: noteID } }
    );

    return Response.json({ status: "ok" });
}
