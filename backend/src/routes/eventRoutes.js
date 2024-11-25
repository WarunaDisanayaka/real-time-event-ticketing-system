const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware"); // Multer middleware

const eventController = require("../controllers/eventController");

// Create a new event
router.post("/create", upload.single("image"), eventController.createEvent);

module.exports = router;
