const { setTimeout } = require('timers/promises');

export async function GET(req, res) {

        // Make a note we are on

        // the api. This goes to the console.

        console.log("in the update api page")


        // get the values

        // that were sent across to us.

        const { searchParams } = new URL(req.url)

        const chatID = searchParams.get('chatID')

        const userID = searchParams.get('userID')

        console.log(chatID);

        console.log(userID);
        

 

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
          chatID: chatID,
          userID: userID
        };
 

        const findResult = await collection.find(filter).toArray();
          if (findResult.length === 0) {
          return Response.json([]);
          }
        console.log('Found update documents =>', findResult[0].text);
 
 

   //==========================================================

 


        for (let i = 0; i < 30; i++) {
          console.log("hello" + i)

          let newResult = await collection.find(filter).toArray();
          if (findResult.length === 0) {
          return Response.json([]);
          }
          console.log(findResult[0].text, '<= Found new documents =>', newResult[0].text);
          console.log(findResult[0].text.length, newResult[0].text.length)
          console.log(findResult[0].text.length == newResult[0].text.length)
          if (findResult[0].text.length != newResult[0].text.length) {
            console.log("\npassed\n")
            return Response.json(newResult)
          }
          await setTimeout(1000);
        
        }
 

 

 

 

        // at the end of the process we need to send something back.

        return Response.json(findResult)

  }

 

 

