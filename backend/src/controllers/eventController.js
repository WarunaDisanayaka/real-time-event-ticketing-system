const db = require("../config/db"); // Correct path to your db.js file
const Event = require("../models/eventModel");

exports.createEvent = async (req, res) => {
  try {
    const {
      name,
      totalTickets,
      ticketReleaseRate,
      customerRetrievalRate,
      startDate,
      vendorId,
    } = req.body;

    // Validate the input
    if (
      !name ||
      !totalTickets ||
      !ticketReleaseRate ||
      !customerRetrievalRate ||
      !startDate ||
      !vendorId
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if the vendor exists (optional)
    const [vendor] = await db.execute("SELECT id FROM users WHERE id = ?", [
      vendorId,
    ]);
    if (!vendor) {
      return res.status(400).json({ error: "Vendor does not exist." });
    }

    // Check if an image file was uploaded
    const image = req.file ? req.file.path : null;

    // Default ticketsAvailable to totalTickets initially
    const eventData = {
      name,
      totalTickets,
      ticketsAvailable: totalTickets,
      ticketReleaseRate,
      customerRetrievalRate,
      status: "pending", // Default status
      startDate,
      image, // Include the image path
      vendorId, // Include vendorId in the event data
    };

    // Call the model to save the event in the database
    const result = await Event.create(eventData);

    res.status(201).json({
      message: "Event created successfully!",
      eventId: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the event." });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.getAll(); // Call the model method to get all events
    res.status(200).json(events); // Return the events as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching events." });
  }
};

exports.getEventsByVendorId = async (req, res) => {
  try {
    const vendorId = req.params.vendorId; // Get vendorId from the request parameters
    if (!vendorId) {
      return res.status(400).json({ error: "Vendor ID is required." });
    }

    const events = await Event.getByVendorId(vendorId); // Call the model method to get events for the specific vendor
    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this vendor." });
    }

    res.status(200).json(events); // Return the events as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching events." });
  }
};
