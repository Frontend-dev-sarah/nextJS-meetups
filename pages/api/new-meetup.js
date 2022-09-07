import { MongoClient } from "mongodb";
// /api/new-meetup, the code in this file is safe not exposed to client

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, address, description } = data;
    const client = await MongoClient.connect(
      "mongodb+srv://admin:Iahw3Iz4pUqRWry7@cluster0.yxfwq.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetupsCollection");
    const result = await meetupsCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: "Meetup inserted" });
  }
}
