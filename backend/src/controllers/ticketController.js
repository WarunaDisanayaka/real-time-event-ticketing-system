const { Worker } = require("worker_threads");
const db = require("../config/db");

let workers = {};

exports.startTicketRelease = async (req, res) => {
  const { eventId } = req.params;

  try {
    // Fetch event details
    const [event] = await db
      .promise()
      .query(`SELECT * FROM events WHERE id = ?`, [eventId]);
    if (!event.length)
      return res.status(404).json({ error: "Event not found" });

    if (event[0].releaseStatus === "running") {
      return res
        .status(400)
        .json({ error: "Ticket release is already running for this event." });
    }

    // Update the release status to 'running'
    await db
      .promise()
      .query(`UPDATE events SET releaseStatus = 'running' WHERE id = ?`, [
        eventId,
      ]);

    // Start the worker thread
    const worker = new Worker("./utils/ticketReleaseWorker.js", {
      workerData: {
        eventId,
        releaseRate: event[0].ticketReleaseRate,
      },
    });

    workers[eventId] = worker;

    // Handle worker messages
    worker.on("message", async (msg) => {
      if (msg.status === "stopped" || msg.status === "completed") {
        await db
          .promise()
          .query(`UPDATE events SET releaseStatus = ? WHERE id = ?`, [
            msg.status,
            eventId,
          ]);
        worker.terminate();
        delete workers[eventId];
      }
    });

    worker.on("error", async (error) => {
      console.error(error);
      await db
        .promise()
        .query(`UPDATE events SET releaseStatus = 'stopped' WHERE id = ?`, [
          eventId,
        ]);
      delete workers[eventId];
    });

    res.status(200).json({ message: "Ticket release started successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to start ticket release." });
  }
};

exports.stopTicketRelease = async (req, res) => {
  const { eventId } = req.params;

  try {
    const [event] = await db
      .promise()
      .query(`SELECT * FROM events WHERE id = ?`, [eventId]);
    if (!event.length)
      return res.status(404).json({ error: "Event not found" });

    if (event[0].releaseStatus === "stopped") {
      return res
        .status(400)
        .json({ error: "Ticket release is not running for this event." });
    }

    // Update the release status to 'stopped'
    await db
      .promise()
      .query(`UPDATE events SET releaseStatus = 'stopped' WHERE id = ?`, [
        eventId,
      ]);

    // Terminate the worker thread
    if (workers[eventId]) {
      workers[eventId].terminate();
      delete workers[eventId];
    }

    res.status(200).json({ message: "Ticket release stopped successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to stop ticket release." });
  }
};
