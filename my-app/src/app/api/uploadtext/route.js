export async function GET(req, res) {

  // Make a note we are on

  // the api. This goes to the console.

  console.log("in the api page")

  // get the values

  // that were sent across to us.

  const { searchParams } = new URL(req.url)

  const noteText = searchParams.get('text')
  
  console.log(noteText);

 
  // database call goes here

  const { MongoClient } = require('mongodb');

  const url = 'mongodb://root:example@localhost:27017/';

  const client = new MongoClient(url);

  const dbName = 'app'; // database name


  await client.connect();

  console.log('Connected successfully to server');

  const db = client.db(dbName);

  const collection = db.collection('notes'); // collection name

  console.log(collection.find().toArray);

  const filter = { name: "temp"};

  const updateDocument = {
    $set: {
        text: noteText,
    },
  };

  await collection.updateOne(filter, updateDocument);


  // at the end of the process we need to send something back.

  return Response.json({ "data":"valid" })

}

