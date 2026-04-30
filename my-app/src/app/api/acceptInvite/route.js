<<<<<<< HEAD
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
=======
import { ObjectId } from 'mongodb'

export async function GET(req, res) {

        // Make a note we are on
        // the api. This goes to the console.
        console.log("in the accept invite api page")


        // get the values
        // that were sent across to us.
        const { searchParams } = new URL(req.url)

        const noteID = searchParams.get('noteID')
        const userID = searchParams.get('userID')

        console.log(noteID);
        console.log(userID);


        // =================================================
        const { MongoClient } = require('mongodb');


        const url = 'mongodb://root:example@localhost:27017/';
        const client = new MongoClient(url);


        const dbName = 'app'; // database name


        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('notes'); // collection name


   //==========================================================


        const filter = {
            _id: new ObjectId(noteID)
        }

        const updateDocument = {
            $addToSet: {
                editors: userID
            }
        }

        const result = await collection.updateOne(filter, updateDocument);

        console.log('Updated note editors =>', result);


        // at the end of the process we need to send something back.
        return Response.json({ data: "valid" })

>>>>>>> c5282e7d36c1737fa263f85240280a0dbffd9a57
}
