export async function GET(req, res) {

    // Make a note we are on

    // the api. This goes to the console.

    console.log("in the api page")

    // get the values

    // that were sent across to us.

    const { searchParams } = new URL(req.url);

    const invitee = searchParams.get("invitee");

    // =================================================

        const { MongoClient } = require('mongodb');

 

        const url = 'mongodb://root:example@localhost:27017/';

        const client = new MongoClient(url);

   
        const dbName = 'app'; // database name

        await client.connect();

        console.log('Connected successfully to server');

        const db = client.db(dbName);

        const invites = db.collection('invites'); 

    // =================================================

    const query = { invitee };
    const data = await invites.find(query).toArray();

    return Response.json(data);
}