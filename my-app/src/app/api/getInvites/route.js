export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const invitee = searchParams.get("invitee");

    const { MongoClient } = require("mongodb");
    const client = new MongoClient("mongodb://root:example@localhost:27017/");
    await client.connect();

    const db = client.db("app");
    const invites = db.collection("invites");

    const query = invitee ? { invitee } : {};
    const data = await invites.find(query).toArray();

    return Response.json(data);
}