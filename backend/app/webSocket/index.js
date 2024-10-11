const WebSocket = require("ws");


const wsServer = new WebSocket.Server({
    noServer: true
})

wsServer.on("connection", function(connection) {    // what should a websocket do on connection
    
})
