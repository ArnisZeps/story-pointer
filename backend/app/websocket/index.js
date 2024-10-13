import { WebSocketServer } from "ws";

import url from "url";
export const WSS_SERVER = new WebSocketServer({ port: 8080 });
export const CONNECTION_MAP = {};

const websocketInit = () => {
  WSS_SERVER.on("connection", (ws, incomingRequest) => {
    const parsedUrl = url.parse(incomingRequest.url, true);
    let sessionId;
    if (typeof parsedUrl.query === "string") {
      const queryParts = parsedUrl.query.split("=");
      if (queryParts[0] === "sessionId") {
        sessionId = queryParts[1];
      }
    } else {
      sessionId = parsedUrl.query.sessionId; // If parsed correctly as an object
    }
    CONNECTION_MAP[sessionId] = [...CONNECTION_MAP[sessionId] || [], ws];
    // Event listener for incoming messages
    // ws.on('message', (message) => {
    //   console.log('Received message:', message.toString());

    //   // Broadcast the message to all connected clients
    //   this.WSS_SERVER.clients.forEach((client) => {
    //     if (client.readyState === WebSocket.OPEN) {
    //       client.send(message.toString());
    //     }
    //   });
    // });
    // this.WSS_SERVER.clients.forEach((client) => {
    //     // if (client.readyState === WebSocket.OPEN) {
    //       client.send("message.toString()");
    //         console.log("client",JSON.stringify(client))

    //     // }
    //   });        // Event listener for client disconnection
    // console.log("clients count ",this.WSS_SERVER.clients.size)
    ws.on("close", () => {
      console.log("A client disconnected.");
    });
  });
};

export default websocketInit;
