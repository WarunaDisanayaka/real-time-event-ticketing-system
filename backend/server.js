const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const ticketRoutes = require("./src/routes/ticketRoutes");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes for authentication
app.use("/api/auth", authRoutes);

// Routes for events management
app.use("/api/event", eventRoutes);

app.use("/api/ticket", ticketRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
