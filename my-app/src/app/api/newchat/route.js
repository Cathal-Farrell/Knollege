export async function GET(req, res) {

  // Make a note we are on

  // the api. This goes to the console.

  console.log("in the api page")

  // get the values

  // that were sent across to us.

  const { searchParams } = new URL(req.url)

  const chatName = searchParams.get('chatName')

  const chatID = searchParams.get('chatID')

  const members = searchParams.get('members')

  console.log(chatName)

  console.log(chatID);

  console.log(members);

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
    chatID: chatID
  }

  const findResult = await collection.find(filter).toArray();


  const membersArray = members.split(",")

  // Test if all membersArray's items are numbers
  // https://www.geeksforgeeks.org/javascript/how-to-check-if-string-contains-only-digits-in-javascript/
  const regex = /^\d+$/;
  var isNumbersPass = true;
  for (let i in membersArray) {
    console.log(regex.test(membersArray[i]))
    if (regex.test(membersArray[i]) == false) {
        console.log("failed");
        isNumbersPass = false;
    }
    console.log(isNumbersPass);
  }

  if (chatName == "" || chatID == "" || members == "") {
    return Response.json({ "data": "incomplete" })
  }
  else if (findResult.length > 0) {
    return Response.json({ "data": "invalid" })
  }
  else if (isNumbersPass == false) {
    return Response.json({ "data": "incompliant" })
  }
  else {

    const updateJSON = {
      chatName: chatName,
      chatID: chatID,
      userID: membersArray,
      text: []
    }

    collection.insertOne(updateJSON);
    
    // database call goes here

    // at the end of the process we need to send something back.

    return Response.json({ "data":"valid" })

  }
}



  