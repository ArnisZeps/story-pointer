import { updateOne, getObjectId } from "../util/mongoClient.js";

const addUserToSession = async ({ userId, sessionId }) => {
  const id = await getObjectId({id: sessionId})
  const documentId = { '_id': id};
  return updateOne({ collectionName: "sessions", documentId, params: { '$push': { users: userId } } });
};

export default addUserToSession;
