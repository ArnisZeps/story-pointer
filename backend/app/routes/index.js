import 'dotenv/config'
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const { MONGO_URL } = process.env;

const router = express.Router();

const client = new MongoClient(MONGO_URL);

const dbName = "myProject";

router.post("/session", async (req, res) => {
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

router.post("/session/user", async (req, res) => {
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

router.patch("/session", async (req, res) => {
  try {
    console.log(req);
    const {
      body: { sessionId },
    } = req;
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("sessions");
    await collection.updateOne({ sessionId }, { $set: { estimates: [3, 2, 1] } });
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

router.delete("/collection", async (req, res) => {
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

router.get("/all", async (req, res) => {
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

export default router;