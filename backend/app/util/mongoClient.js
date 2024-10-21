import "dotenv/config";
import { MongoClient, ObjectId } from "mongodb";
const { MONGO_URL_DEV, MONGO_URL_PROD, NODE_ENV } = process.env;
const DB_NAME = "STORY_POINT_MAIN";
console.log(MONGO_URL_DEV, MONGO_URL_PROD)
const client = new MongoClient(NODE_ENV === "PROD" ? MONGO_URL_PROD : MONGO_URL_DEV);

export const insertOne = async ({ collectionName, params }) => {
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(collectionName);
  return await collection.insertOne(params);
};

export const findOne = async ({ collectionName, documentId }) => {
  await client.connect();
  const db = client.db(DB_NAME);
  const collection = db.collection(collectionName);
  return await collection.findOne(documentId);
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