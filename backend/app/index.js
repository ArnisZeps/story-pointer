if (process.env.NODE_ENV === "production") {
  require("dotenv").config(); // In production, load .env or any production-specific env file
} else {
  require("dotenv").config({ path: ".env.local" });
}
const { MONGO_URL, PORT } = process.env;
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const express = require("express");
const client = new MongoClient(MONGO_URL);
const dbName = "myProject";
const app = express();

app.listen(PORT);
app.use(
  cors({
    origin: "http://localhost:3000", // Allow the frontend URL
    credentials: true,
  }),
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
console.log("Listening on port", PORT);

app.post("/session", async (req, res) => {
  try {
    console.log("req");
    const {
      body: { userName },
    } = req;
    await client.connect();
    const db = client.db(dbName);
    const sessions = db.collection("sessions");
    const resp = await sessions.insertOne({ participants: [{ name: userName, role: "creator" }] });
    res.set({
      "Content-Type": "application/json",
    });
    res.status(200).send({
      body: resp,
    });
  } catch (err) {
    res.status(500).send({
      info: "Request failed",
      trace: err.message,
    });
  }
});

app.post("/session/user", async (req, res) => {
  try {
    const {
      body: { sessionId, userName },
    } = req;
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("sessions");

    await collection.updateOne({ _id: ObjectId.createFromHexString(sessionId) }, { $push: { estimates: { name: userName } } });

    const findResult = await collection.find({}).toArray();

    res.set({
      "Content-Type": "application/json",
    });
    res.status(200).send({
      body: findResult,
    });
  } catch (err) {
    res.status(500).send({
      info: "Request failed",
      trace: err.message,
    });
  }
});

app.patch("/session", async (req, res) => {
    try {
        console.log(req)
        const { body: { sessionId } } = req;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('sessions');
        await collection.updateOne({ sessionId }, { $set: { "estimates" : [3, 2, 1] } });
        const findResult = await collection.find({}).toArray();

        res.set({
            'Content-Type': 'application/json',
        });
        res.status(200).send( {
            body: findResult
        });
    } catch(err) {
        res.status(500).send( {
            info: "Request failed",
            trace: err.message,
        });
    }
});

app.delete("/collection", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("sessions");
    await collection.deleteMany({});
    const findResult = await collection.find({}).toArray();

    res.set({
      "Content-Type": "application/json",
    });
    res.status(200).send({
      body: findResult,
    });
  } catch (err) {
    res.status(500).send({
      info: "Request failed",
      trace: err.message,
    });
  }
});

app.get("/all", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("sessions");
    const findResult = await collection.find({}).toArray();

    res.set({
      "Content-Type": "application/json",
    });
    res.status(200).send({
      body: findResult,
    });
  } catch (err) {
    res.status(500).send({
      info: "Request failed",
      trace: err.message,
    });
  }
});
