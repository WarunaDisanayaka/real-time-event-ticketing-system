const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware"); // Multer middleware

const eventController = require("../controllers/eventController");

// Create a new event
router.post("/create", upload.single("image"), eventController.createEvent);

// Gett all events
router.get("/events", eventController.getAllEvents);

// Get event by vendor id
router.get("/vendor/:vendorId", eventController.getEventsByVendorId);

router.post(
  "/start-ticket-release/:eventId",
  eventController.startTicketRelease
);
router.post("/stop-ticket-release/:eventId", eventController.stopTicketRelease);
// router.post("/release-tickets/:eventId", eventController.releaseTickets);

router.post("/events/:eventId/purchase", eventController.purchaseTickets);

router.get("/events/:eventId", eventController.getEventById);


module.exports = router;
