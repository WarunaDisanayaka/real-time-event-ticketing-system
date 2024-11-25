const db = require("../config/db"); // Correct path to your db.js file
const Event = require("../models/eventModel");
const asyncLock = require("async-lock");
const lock = new asyncLock(); // Initialize the lock
const { broadcastTicketUpdate } = require("../../src/websocket/websocket");

exports.createEvent = async (req, res) => {
  try {
    const {
      name,
      totalTickets,
      ticketReleaseRate,
      customerRetrievalRate,
      startDate,
      vendorId,
      price, // Include price in the request body
    } = req.body;

    // Validate the input
    if (
      !name ||
      !totalTickets ||
      !ticketReleaseRate ||
      !customerRetrievalRate ||
      !startDate ||
      !vendorId ||
      price === undefined // Ensure price is provided
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required, including price." });
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
      price: parseFloat(price), // Parse price to ensure it's a valid number
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

let releaseIntervalIds = {}; // To keep track of active intervals for each event

// Start ticket release for an event
exports.startTicketRelease = async (req, res) => {
  const eventId = req.params.eventId;
  console.log(`Attempting to release tickets for event ID: ${eventId}`);

  lock.acquire(`event-${eventId}`, async (done) => {
    try {
      console.log(`Lock acquired for event ID: ${eventId}`);

      // Fetch event details from the database
      const [rows] = await db.query("SELECT * FROM events WHERE id = ?", [
        eventId,
      ]);
      const event = rows[0];

      if (!event) {
        console.error(`Event with ID ${eventId} not found.`);
        return res.status(404).send("Event not found.");
      }

      if (releaseIntervalIds[eventId]) {
        console.log(
          `Ticket release is already in progress for event: ${event.name}`
        );
        return res.status(400).send("Ticket release is already in progress.");
      }

      // Allow restarting ticket release if `releaseStatus` is "stopped"
      if (event.releaseStatus === "stopped") {
        console.log(`Restarting ticket release for event: ${event.name}`);
        await db.query(
          "UPDATE events SET releaseStatus = 'in_progress' WHERE id = ?",
          [eventId]
        );
      }

      const ticketsToRelease = Math.min(
        event.ticketReleaseRate, // releaseRate from the event
        event.totalTickets - event.ticketsAvailable
      );

      if (ticketsToRelease <= 0) {
        console.log(`No tickets left to release for event: ${event.name}`);
        return res.status(400).send("No tickets left to release.");
      }

      console.log(
        `Releasing ${ticketsToRelease} tickets for event: ${event.name}`
      );

      // Start releasing tickets periodically
      releaseIntervalIds[eventId] = setInterval(async () => {
        // Fetch the updated event status to check if release is still allowed
        const [updatedEventRows] = await db.query(
          "SELECT * FROM events WHERE id = ?",
          [eventId]
        );
        const updatedEvent = updatedEventRows[0];

        if (updatedEvent.releaseStatus === "stopped") {
          clearInterval(releaseIntervalIds[eventId]);
          delete releaseIntervalIds[eventId];
          console.log(
            `Stopped releasing tickets for event: ${updatedEvent.name}`
          );
          return;
        }

        const ticketsToRelease = Math.min(
          updatedEvent.ticketReleaseRate, // releaseRate from the event
          updatedEvent.totalTickets - updatedEvent.ticketsAvailable
        );

        if (ticketsToRelease > 0) {
          await db.query(
            "UPDATE events SET ticketsAvailable = ticketsAvailable + ? WHERE id = ?",
            [ticketsToRelease, eventId]
          );
          console.log(
            `${ticketsToRelease} tickets successfully released for event: ${updatedEvent.name}`
          );
        } else {
          console.log("No tickets to release this interval.");
        }
      }, 60000); // Repeat every minute (or desired interval)

      res.send(`Started releasing tickets for event: ${event.name}`);
    } catch (error) {
      console.error(
        `Error while releasing tickets for event ID: ${eventId}:`,
        error
      );
      res.status(500).send("Error while releasing tickets.");
    } finally {
      console.log(`Releasing lock for event ID: ${eventId}`);
      done(); // Release the lock after completing the operation
    }
  });
};

// Stop ticket release for an event
exports.stopTicketRelease = async (req, res) => {
  const eventId = req.params.eventId;
  console.log(`Attempting to stop ticket release for event ID: ${eventId}`);

  lock.acquire(`event-${eventId}`, async (done) => {
    try {
      // Fetch event details from the database
      const [rows] = await db.query("SELECT * FROM events WHERE id = ?", [
        eventId,
      ]);
      const event = rows[0];

      if (!event) {
        console.error(`Event with ID ${eventId} not found.`);
        return res.status(404).send("Event not found.");
      }

      if (event.releaseStatus === "stopped") {
        console.log(
          `Ticket release is already stopped for event: ${event.name}.`
        );
        return res.status(400).send("Ticket release is already stopped.");
      }

      // Stop ticket release
      await db.query(
        "UPDATE events SET releaseStatus = 'stopped' WHERE id = ?",
        [eventId]
      );

      // Clear the interval for the event
      if (releaseIntervalIds[eventId]) {
        clearInterval(releaseIntervalIds[eventId]);
        delete releaseIntervalIds[eventId];
      }

      console.log(`Stopped releasing tickets for event: ${event.name}`);
      res.send(`Stopped releasing tickets for event: ${event.name}`);
    } catch (error) {
      console.error(
        `Error while stopping ticket release for event ID: ${eventId}:`,
        error
      );
      res.status(500).send("Error while stopping ticket release.");
    } finally {
      console.log(`Releasing lock for event ID: ${eventId}`);
      done(); // Release the lock after completing the operation
    }
  });
};

exports.purchaseTickets = async (req, res) => {
  const eventId = req.params.eventId;
  const { customerId, ticketsRequested } = req.body;

  if (!customerId || !ticketsRequested) {
    return res
      .status(400)
      .send("Customer ID and ticketsRequested are required.");
  }

  console.log(
    `Customer ${customerId} attempting to purchase ${ticketsRequested} tickets for event ID: ${eventId}`
  );

  lock.acquire(`event-${eventId}`, async (done) => {
    try {
      console.log(`Lock acquired for ticket purchase of event ID: ${eventId}`);

      // Fetch event details
      const [eventRows] = await db.query("SELECT * FROM events WHERE id = ?", [
        eventId,
      ]);
      const event = eventRows[0];

      if (!event) {
        console.error(`Event with ID ${eventId} not found.`);
        return res.status(404).send("Event not found.");
      }

      // Ensure the customer does not exceed the event's customerRetrievalRate
      const maxTickets = Math.min(
        event.customerRetrievalRate, // customerRetrievalRate from the event table
        event.ticketsAvailable
      );

      if (ticketsRequested > maxTickets) {
        console.log(
          `Customer ${customerId} requested ${ticketsRequested} tickets, but only ${maxTickets} can be purchased.`
        );
        return res
          .status(400)
          .send(`You can purchase up to ${maxTickets} tickets.`);
      }

      if (ticketsRequested <= 0 || event.ticketsAvailable <= 0) {
        console.log(`No tickets left for event: ${event.name}`);
        return res.status(400).send("No tickets left for this event.");
      }

      // Calculate total price
      const totalPrice = ticketsRequested * event.price;

      // Process the ticket purchase
      await db.query(
        "UPDATE events SET ticketsAvailable = ticketsAvailable - ? WHERE id = ?",
        [ticketsRequested, eventId]
      );

      // Fetch the updated ticket count
      const [updatedEventRows] = await db.query(
        "SELECT ticketsAvailable FROM events WHERE id = ?",
        [eventId]
      );
      const updatedTicketsAvailable = updatedEventRows[0].ticketsAvailable;

      // Broadcast the updated ticket count in real-time
      broadcastTicketUpdate(eventId, updatedTicketsAvailable);

      // Log the purchase in a separate table for tracking
      await db.query(
        "INSERT INTO ticket_purchases (customerId, eventId, ticketsPurchased, totalPrice, purchaseTime) VALUES (?, ?, ?, ?, NOW())",
        [customerId, eventId, ticketsRequested, totalPrice]
      );

      console.log(
        `Customer ${customerId} successfully purchased ${ticketsRequested} tickets for event: ${event.name}`
      );

      res.send({
        message: `Successfully purchased ${ticketsRequested} tickets for event: ${event.name}`,
        totalPrice: totalPrice.toFixed(2),
      });
    } catch (error) {
      console.error(
        `Error while processing ticket purchase for customer ${customerId} on event ${eventId}:`,
        error
      );
      res.status(500).send("Error while processing ticket purchase.");
    } finally {
      console.log(`Releasing lock for event ID: ${eventId}`);
      done(); // Release the lock
    }
  });
};
