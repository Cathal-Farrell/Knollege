import { getSession } from '../../lib/session';

export async function GET(req, res) {

  // Make a note we are on

  // the api. This goes to the console.

  console.log("in the api page")

  // get the values

  // that were sent across to us.

  const { searchParams } = new URL(req.url)

  const name = searchParams.get('name')

  const email = searchParams.get('email')

  const pass = searchParams.get('pass')

  const confirmPass = searchParams.get('confirmPass')

  console.log(name)

  console.log(email);

  console.log(pass);

  console.log(confirmPass);

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
    email: email
  }

  const findResult = await collection.find(filter).toArray();

  if (name == "" || email == "" || pass == "" || confirmPass == "") {
    return Response.json({ "data": "incomplete" })
  }
  else if (findResult.length > 0) {
    return Response.json({ "data": "invalid" })
  }
  else if (pass != confirmPass) {
    return Response.json({ "data": "inconsistent" })
  }
  else {

    const updateJSON = {
      name: name,
      email: email,
      password: pass,
    }

    const insertDetails = await collection.insertOne(updateJSON);

    const session = await getSession();
    session.userID = String(insertDetails.insertedId);
    session.email = email;

    await session.save();


    
    // database call goes here

    // at the end of the process we need to send something back.

    return Response.json({ "data":"valid" })

  }
}



  