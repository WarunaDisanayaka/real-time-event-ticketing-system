const Event = require("../models/eventModel");

exports.createEvent = async (req, res) => {
  try {
    const {
      name,
      totalTickets,
      ticketReleaseRate,
      customerRetrievalRate,
      startDate,
    } = req.body;

    // Validate the input
    if (
      !name ||
      !totalTickets ||
      !ticketReleaseRate ||
      !customerRetrievalRate ||
      !startDate
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Default ticketsAvailable to totalTickets initially
    const eventData = {
      name,
      totalTickets,
      ticketsAvailable: totalTickets,
      ticketReleaseRate,
      customerRetrievalRate,
      status: "pending", // Default status
      startDate,
    };

    // Call the model to save the event in the database
    const result = await Event.create(eventData);
    res
      .status(201)
      .json({
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
