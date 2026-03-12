import { getSession } from '../../lib/session';

export async function GET(req, res) {

  // Make a note we are on

  // the api. This goes to the console.

  console.log("in the api page")

  // get the values

  // that were sent across to us.

  const { searchParams } = new URL(req.url)

  const email = searchParams.get('email')

  const pass = searchParams.get('pass')

  console.log(email);

  console.log(pass);

 // =================================================

  const { MongoClient } = require('mongodb');

  const url = 'mongodb://root:example@localhost:27017/';
  
  const client = new MongoClient(url);

 

 

  const dbName = 'app'; // database name

  await client.connect();

  console.log('Connected successfully to server');

  const db = client.db(dbName);

  const collection = db.collection('users'); // collection name

  const filter = { 
          email: email,
          password: pass
        };

  const findUser = await collection.find(filter).toArray();

  

  console.log('Found documents =>', findUser);

  let valid = false

  if(findUser.length > 0){

          valid = true;

          console.log("login valid")

          const session = await getSession();
           session.userID = String(findUser[0]._id);
          session.email = findUser[0].email;

          await session.save();

  } else {

        valid = false;

        console.log("login invalid")

  }

 //==========================================================

  // at the end of the process we need to send something back.

  return Response.json({ "data":"" + valid + ""})

}