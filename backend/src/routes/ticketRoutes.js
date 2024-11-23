const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

// Start ticket release
router.post(
  "/events/:eventId/start-release",
  ticketController.startTicketRelease
);

// Stop ticket release
router.post(
  "/events/:eventId/stop-release",
  ticketController.stopTicketRelease
);

module.exports = router;
