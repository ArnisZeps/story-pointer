import "dotenv/config";
import express from "express";
import createUser from "../src/createUser.js";
import createSession from "../src/createSession.js";
import addUserToSession from "../src/addUserToSession.js";
import addEvaluation from "../src/addEvaluation.js";

const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    const {
      body: { userName },
    } = req;
    const { insertedId: userId } = await createUser({ userName });
    res.set({
      "Content-Type": "application/json",
    });
    res.status(200).send({
      userId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      info: "Request failed",
      trace: err.message,
    });
  }
});

router.post("/session", async (req, res) => {
  try {
    const {
      body: { userId },
    } = req;
    const { insertedId: sessionId } = await createSession({ userId });
    res.set({
      "Content-Type": "application/json",
    });
    res.status(200).send({
      sessionId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      info: "Request failed",
      trace: err.message,
    });
  }
});

router.post("/session/user", async (req, res) => {
  try {
    const {
      body: { userId, sessionId },
    } = req;
    const resp = await addUserToSession({ userId, sessionId });
    res.set({
      "Content-Type": "application/json",
    });
    res.status(200).send({
      ...resp,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      info: "Request failed",
      trace: err.message,
    });
  }
});

router.post("/session/evaluation", async (req, res) => {
  try {
    const {
      body: { userId, sessionId, evaluation },
    } = req;
    const resp = await addEvaluation({ userId, sessionId, evaluation });
    res.set({
      "Content-Type": "application/json",
    });
    res.status(200).send({
      ...resp,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      info: "Request failed",
      trace: err.message,
    });
  }
});
// router.post("/session/user", async (req, res) => {
//   try {
//     const {
//       body: { sessionId, userName },
//     } = req;
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection("sessions");

//     await collection.updateOne({ _id: ObjectId.createFromHexString(sessionId) }, { $push: { estimates: { name: userName } } });

//     const findResult = await collection.find({}).toArray();

//     res.set({
//       "Content-Type": "application/json",
//     });
//     res.status(200).send({
//       body: findResult,
//     });
//   } catch (err) {
//     res.status(500).send({
//       info: "Request failed",
//       trace: err.message,
//     });
//   }
// });

// router.patch("/session", async (req, res) => {
//   try {
//     console.log(req);
//     const {
//       body: { sessionId },
//     } = req;
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection("sessions");
//     await collection.updateOne({ sessionId }, { $set: { estimates: [3, 2, 1] } });
//     const findResult = await collection.find({}).toArray();

//     res.set({
//       "Content-Type": "application/json",
//     });
//     res.status(200).send({
//       body: findResult,
//     });
//   } catch (err) {
//     res.status(500).send({
//       info: "Request failed",
//       trace: err.message,
//     });
//   }
// });

// router.delete("/collection", async (req, res) => {
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection("sessions");
//     await collection.deleteMany({});
//     const findResult = await collection.find({}).toArray();

//     res.set({
//       "Content-Type": "application/json",
//     });
//     res.status(200).send({
//       body: findResult,
//     });
//   } catch (err) {
//     res.status(500).send({
//       info: "Request failed",
//       trace: err.message,
//     });
//   }
// });

// router.get("/all", async (req, res) => {
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection("sessions");
//     const findResult = await collection.find({}).toArray();

//     res.set({
//       "Content-Type": "application/json",
//     });
//     res.status(200).send({
//       body: findResult,
//     });
//   } catch (err) {
//     res.status(500).send({
//       info: "Request failed",
//       trace: err.message,
//     });
//   }
// });

export default router;
