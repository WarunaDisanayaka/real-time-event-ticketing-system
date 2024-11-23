const { parentPort, workerData } = require("worker_threads");
const db = require("../config/db");

const releaseTickets = async ({ eventId, releaseRate }) => {
  try {
    while (true) {
      // Fetch the current status of the event
      const [event] = await db
        .promise()
        .query(
          `SELECT ticketsAvailable, totalTickets, releaseStatus FROM events WHERE id = ?`,
          [eventId]
        );

      if (!event.length || event[0].releaseStatus === "stopped") {
        parentPort.postMessage({ status: "stopped" });
        break;
      }

      const ticketsAvailable = event[0].ticketsAvailable;

      // Stop releasing if tickets are fully available
      if (ticketsAvailable >= event[0].totalTickets) {
        parentPort.postMessage({ status: "completed" });
        break;
      }

      // Release tickets at the specified rate
      const newTicketsAvailable = Math.min(
        ticketsAvailable + releaseRate,
        event[0].totalTickets
      );

      await db
        .promise()
        .query(`UPDATE events SET ticketsAvailable = ? WHERE id = ?`, [
          newTicketsAvailable,
          eventId,
        ]);

      // Notify parent about the updated status
      parentPort.postMessage({
        status: "running",
        ticketsAvailable: newTicketsAvailable,
      });

      // Wait 1 minute before the next release cycle
      await new Promise((resolve) => setTimeout(resolve, 60000));
    }
  } catch (error) {
    parentPort.postMessage({ status: "error", error });
  }
};

// Start the worker process
releaseTickets(workerData);
