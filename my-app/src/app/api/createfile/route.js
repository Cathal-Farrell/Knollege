export async function GET(req, res) {

        // Make a note we are on

        // the api. This goes to the console.

        console.log("in the create file api page")


        // get the values

        // that were sent across to us.

        const { searchParams } = new URL(req.url)

        const userID = searchParams.get('userID')

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



        const updateJSON = {
            userID: userID,
            fileName: "New File",
            text: "text here"
        }

 
        collection.insertOne(updateJSON);
 

        findResult = await collection.find(filter).toArray();

        console.log('Found documents after =>', findResult);
 

 

        // at the end of the process we need to send something back.

        return Response.json(findResult)

  }

 

 

