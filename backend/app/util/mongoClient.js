import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
const { MONGO_URL } = process.env;
const DB_NAME = "STORY_POINT_MAIN";
const client = new MongoClient(MONGO_URL);

export const insertOne = async ({ collectionName, params }) => {
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(collectionName);
  return await collection.insertOne(params);
};

export const updateOne = async ({ collectionName, documentId, params }) => {
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(collectionName);
  return await collection.updateOne(documentId, params);
};

export const getObjectId = async({ id }) => {
    return ObjectId.createFromHexString(id);
}