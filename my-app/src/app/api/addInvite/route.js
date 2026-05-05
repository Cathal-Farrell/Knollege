export async function GET(req) {
    // Make a note we are on

    // the api. This goes to the console.

    console.log("in the api page")

    // get the values

    // that were sent across to us.

    const { searchParams } = new URL(req.url)

    const chatID = searchParams.get("chatID");

    const invitee = searchParams.get("invitee");

    const inviter = searchParams.get("inviter");

    const chatName = searchParams.get("chatName");

    // =================================================

    const { MongoClient } = require('mongodb');


    const url = 'mongodb://root:example@localhost:27017/';
    const client = new MongoClient(url);


    const dbName = 'app'; // database name


    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('invites'); // collection name


    //==========================================================


    await collection.insertOne(
        { chatID, invitee, inviter, chatName }
    );

   // at the end of the process we need to send something back.
    return Response.json({ status: "ok" });
}
