import WebSocket from "ws";
import { updateOne, getObjectId, findOne } from "../util/mongoClient.js";
import { WSS_SERVER } from "../websocket/index.js";
import { CONNECTION_MAP } from "../websocket/index.js";

const addUserToSession = async ({ userId, sessionId }) => {
  const documentId = { '_id': await getObjectId({id: sessionId})};
  const { userName } = await findOne({collectionName: "users", documentId: {'_id': await getObjectId({id: userId })} });
  CONNECTION_MAP[sessionId].forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ messageType: "user", userId, sessionId, evaluation: 0 }));
    }
  });
  return updateOne({ collectionName: "sessions", documentId, params: { '$push': { users: userId } } });
};

export default addUserToSession;
