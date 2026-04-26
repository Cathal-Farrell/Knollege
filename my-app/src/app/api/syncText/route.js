import { ObjectId } from 'mongodb'

export async function GET(req, res) {

  console.log("in the api page")

  const { searchParams } = new URL(req.url)

  const noteID = searchParams.get('noteID')
  const userID = searchParams.get('userID')

  console.log(noteID);
  console.log(userID);

  const { MongoClient } = require('mongodb');

  const url = 'mongodb://root:example@localhost:27017/';
  const client = new MongoClient(url);

  const dbName = 'app';

  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('notes');

  // allow owner OR editors
  const filter = { 
      _id: new ObjectId(noteID),
      editors: { $in: [userID] }
  };

  const result = await collection.find(filter).toArray();
  console.log(result);

  return Response.json(result);
}
