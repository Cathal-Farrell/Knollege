import { ObjectId } from 'mongodb'

export async function GET(req, res) {

  // Make a note we are on

  // the api. This goes to the console.

  console.log("in the upload api page")

  // get the values

  // that were sent across to us.

  const { searchParams } = new URL(req.url)

  const noteText = searchParams.get('text')

  const noteID = searchParams.get('noteID')

  const userID = searchParams.get('userID')
  
  console.log(noteText);
  console.log(noteID);
  console.log(userID);
 
  // database call goes here

  const { MongoClient } = require('mongodb');

  const url = 'mongodb://root:example@localhost:27017/';

  const client = new MongoClient(url);

  const dbName = 'app'; // database name


  await client.connect();

  console.log('Connected successfully to server');

  const db = client.db(dbName);

  const collection = db.collection('notes'); // collection name

  const filter = { 
          _id: new ObjectId(noteID),
          userID: userID
        };
      
  console.log(await collection.find(filter).toArray());
        

  const updateDocument = {
    $set: {
        text: noteText,
    },
  };

  await collection.updateOne(filter, updateDocument);


  // at the end of the process we need to send something back.

  return Response.json({ "data":"valid" })

}

