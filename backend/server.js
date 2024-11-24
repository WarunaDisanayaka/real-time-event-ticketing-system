const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const ticketRoutes = require("./src/routes/ticketRoutes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/event", eventRoutes);

app.use("/api/ticket", ticketRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
