import WebSocket from "ws";
import { insertOne } from "../util/mongoClient.js";
import { CONNECTION_MAP } from "../websocket/index.js";

const addEvaluation = async ({ userId, sessionId, evaluation }) => {
  CONNECTION_MAP[sessionId].forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ messageType: "evaluation", userId, sessionId, evaluation }));
    }
  });
  return insertOne({ collectionName: "evaluations", params: { userId, sessionId, evaluation }});
};

export default addEvaluation;
