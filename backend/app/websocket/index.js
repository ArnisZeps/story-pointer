import { WebSocketServer } from "ws";
import url from "url";
export const WSS_SERVER = new WebSocketServer({ port: 8080 });
export const CONNECTION_MAP = {};

const websocketInit = () => {
  WSS_SERVER.on("connection", (ws, incomingRequest) => {
    const parsedUrl = url.parse(incomingRequest.url, true);
    // Construct URL object
    const requestUrl = new URL(
      incomingRequest.url,
      `http://${incomingRequest.headers.host}`
    );

    // Assuming session ID is passed as a query parameter, for example: ?sessionId=12345
    const sessionId = requestUrl.searchParams.get("sessionId");
    const sessionConnections = CONNECTION_MAP[sessionId];
    if (sessionConnections) CONNECTION_MAP[sessionId] = [...sessionConnections, ws];
    else CONNECTION_MAP[sessionId] = [ws];
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
    this.WSS_SERVER.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("message.toString()");
        console.log("client", JSON.stringify(client));
      }
    });
    // Event listener for client disconnection
    console.log("clients count ", this.WSS_SERVER.clients.size);
    ws.on("close", () => {
      console.log("A client disconnected.");
    });
  });
};

export default websocketInit;
