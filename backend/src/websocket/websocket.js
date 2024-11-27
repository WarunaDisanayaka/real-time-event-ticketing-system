const WebSocket = require("ws");

let wss; // WebSocket server instance
let clients = []; // Store connected clients

function initializeWebSocketServer(server) {
  // Attach WebSocket server to an existing HTTP server
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("New client connected");
    clients.push(ws);

    // Remove client on disconnect
    ws.on("close", () => {
      clients = clients.filter((client) => client !== ws);
      console.log("Client disconnected");
    });
  });

  console.log("WebSocket server initialized");
}

// Broadcast updated ticket count to all connected clients
function broadcastTicketUpdate(eventId, ticketsAvailable) {
  const message = JSON.stringify({
    eventId,
    ticketsAvailable,
  });

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Broadcast real-time ticket purchasing user count to all connected clients
function broadcastTicketPurchasingUserCount(userCount) {
  const message = JSON.stringify({
    userCount, // Current number of users purchasing tickets
    date: new Date().toLocaleString(), // Timestamp for when the count was updated
  });

  // Send the message to all connected clients
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

module.exports = {
  initializeWebSocketServer,
  broadcastTicketUpdate,
  broadcastTicketPurchasingUserCount,
};
