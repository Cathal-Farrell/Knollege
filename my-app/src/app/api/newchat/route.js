export async function GET(req, res) {

  // Make a note we are on

  // the api. This goes to the console.

  console.log("in the api page")

  // get the values

  // that were sent across to us.

  const { searchParams } = new URL(req.url)

  const chatName = searchParams.get('chatName')
  const members = searchParams.get('members')
  const admin = searchParams.get('admin')

  console.log(chatName)
  console.log(members);
  console.log(admin);

  // =================================================

  const { MongoClient, ObjectId } = require('mongodb');

  const url = 'mongodb://root:example@localhost:27017/';
  
  const client = new MongoClient(url);


  const dbName = 'app'; // database name
  await client.connect();
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const collection = db.collection('chats'); // collection name

  const membersArray = (members || "")
    .split(",")
    .map((email) => email.trim())
    .filter((email) => email !== "");

  // always include creator in gc
  if (admin !== "" && !membersArray.includes(admin)) {
    membersArray.push(admin);
  }

  // Test if all membersArray's items are emails
  // https://www.geeksforgeeks.org/javascript/how-to-check-if-string-contains-only-digits-in-javascript/
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var isEmailsPass = true;
  for (let i in membersArray) {
    console.log(regex.test(membersArray[i]))
    if (regex.test(membersArray[i]) == false) {
        console.log("failed");
        isEmailsPass = false;
    }
    console.log(isEmailsPass);
  }

  if (chatName == "" || admin.trim() == "") {
    return Response.json({ "data": "incomplete" })
  }
  else if (isEmailsPass == false) {
    return Response.json({ "data": "incompliant" })
  }
  else {

    const generatedId = new ObjectId();

    const chatDoc = {
    _id: generatedId,
    chatID: generatedId.toString(),
    chatName: chatName,
    userID: membersArray,
    admin: admin,
    text: [],
    };

    await collection.insertOne(chatDoc);
  
  // at the end of the process we need to send something back.
    return Response.json({
    data: "valid",
    chatID: generatedId.toString(),
    });
  }
}



  