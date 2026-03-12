export async function GET(req, res) {

     // Make a note we are on

    // the api. This goes to the console.

    console.log("in the profile api page");

    // get the values

    // that were sent across to us.

    const { searchParams } = new URL(req.url);

    const userID = searchParams.get("userID");
    const displayName = searchParams.get("displayName");
    const email = searchParams.get("email");
    const bio = searchParams.get("bio");
    const profilePicture = searchParams.get("profilePicture");

    console.log("UserID:", userID);

    // ================================
    const { MongoClient } = require("mongodb");

    const url = "mongodb://root:example@localhost:27017/";

    const client = new MongoClient(url);




    const dbName = "app"; // database name

    await client.connect();


    console.log('Connected successfully to server');

    const db = client.db(dbName);

    const collection = db.collection("profile"); // collection name

    const filter = { userID: userID};

    const updateJSON = {
        $set: {
            displayName: displayName,
            email: email,
            bio: bio,
            age: searchParams.get("age"),
            school: searchParams.get("school"),
            profilePicture: searchParams.get("profilePicture")
        }

    };

    await collection.updateOne(filter, updateJSON, {upsert: true});

    const result = await collection.find(filter).toArray();

    console.log("Found profile =>", result);

    // ================================

    return Response.json(result[0] || {});


}
