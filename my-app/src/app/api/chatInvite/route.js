export async function GET(req) {

  // Make a note we are on

  // the api. This goes to the console.

  console.log("in the api page")

  // get the values

  // that were sent across to us.

  const { searchParams } = new URL(req.url);

  const inviteId = searchParams.get("inviteId");

  const chatID = searchParams.get("chatID");

  const email = searchParams.get("email");

  // =================================================

  const { MongoClient, ObjectId } = require("mongodb");

  const url = "mongodb://root:example@localhost:27017/";

  const client = new MongoClient(url);






  const dbName = 'app'; // database name

  await client.connect();

  console.log('Connected successfully to server');

  const db = client.db(dbName);

  const collection = db.collection('chats'); // collection name

  const filterJSON = {
  chatID: chatID,
  };

  const updateJSON = {
    $addToSet: {
    userID: email,
    },
  };

  await collection.updateOne(filterJSON, updateJSON);

  await db.collection("invites").deleteOne({ _id: new ObjectId(inviteId) });


  // at the end of the process we need to send something back.

  return Response.json({ data: "valid" });
}
