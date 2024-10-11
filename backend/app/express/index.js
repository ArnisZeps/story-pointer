const { MongoClient, ObjectId, createFromTime } = require('mongodb');
const express = require('express');
const uuid = require("uuid");

const url = 'mongodb://mongo_db:27017';
const client = new MongoClient(url);
const dbName = 'myProject';
const port = 3000;
const app = express();

app.listen(port);
app.use(express.json({ limit: '50mb'}))
app.use(express.urlencoded({ extended: true }));


app.post("/session", async (req, res) => {
    try {
        console.log(req)
        const { body: { userName } } = req;
        await client.connect();
        const db = client.db(dbName);
        const sessions = db.collection('sessions');
        const resp = await sessions.insertOne( { "estimates" : [{name: userName, estimate: 0}]});
        res.set({
            'Content-Type': 'application/json',
        });
        res.status(200).send( {
            body: resp
        });
    } catch(err) {
        res.status(500).send( {
            info: "Request failed",
            trace: err.message,
        });
    }
});

app.post("/session/user", async (req, res) => {
    try {
        const { body: { sessionId, userName } } = req;
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('sessions');

        await collection.updateOne({ _id: ObjectId.createFromHexString(sessionId) }, { $push: { "estimates" : {name: userName, estimate: 0} } });

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
        const collection = db.collection('sessions');
        await collection.deleteMany({});
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


app.get("/all", async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('sessions');
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