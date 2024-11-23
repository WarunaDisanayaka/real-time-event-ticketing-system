const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// Create a new event
router.post("/events", eventController.createEvent);

module.exports = router;
