const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const ticketRoutes = require("./src/routes/ticketRoutes");
const cors = require("cors");
const path = require("path");
const http = require("http");
const {
  initializeWebSocketServer,
  broadcastTicketUpdate,
} = require("../backend/src/websocket/websocket");

dotenv.config();
const app = express();
app.use(cors());
const server = http.createServer(app);

// Initialize WebSocket server
initializeWebSocketServer(server);

// Middleware
app.use(bodyParser.json());

// Routes for authentication
app.use("/api/auth", authRoutes);

// Routes for events management
app.use("/api/event", eventRoutes);

app.use("/api/ticket", ticketRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server only once
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
