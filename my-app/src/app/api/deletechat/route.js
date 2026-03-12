export async function GET(req, res) {

        // Make a note we are on

        // the api. This goes to the console.

        console.log("in the delete chat api page")


        // get the values

        // that were sent across to us.

        const { searchParams } = new URL(req.url)

        const chatID = searchParams.get('chatID')


        // =================================================

        const { MongoClient } = require('mongodb');

 

        const url = 'mongodb://root:example@localhost:27017/';

        const client = new MongoClient(url);

   


        const dbName = 'app'; // database name

 

        await client.connect();

        console.log('Connected successfully to server');

        const db = client.db(dbName);

        const collection = db.collection('chats'); // collection name

 
        const filter = {
            "chatID": chatID,
        }
 

        let findResult = await collection.find(filter).toArray();

        console.log('Found documents before =>', findResult);

   

 

   //==========================================================

        if (findResult[0] == null)
            return null

    
        const deleteResult = await collection.deleteOne(filter);
        console.log('Deleted document =>', deleteResult);

        findResult = await collection.find(filter).toArray();
        console.log('Found documents after =>', findResult);
 

 

        // at the end of the process we need to send something back.

        return Response.json(findResult)

  }

 

 

