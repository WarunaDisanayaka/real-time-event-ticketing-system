const db = require("../config/db");

const Event = {
  create: async (eventData) => {
    const sql = `
      INSERT INTO events (name, totalTickets, ticketsAvailable, ticketReleaseRate, customerRetrievalRate, status, startDate)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      eventData.name,
      eventData.totalTickets,
      eventData.ticketsAvailable,
      eventData.ticketReleaseRate,
      eventData.customerRetrievalRate,
      eventData.status,
      eventData.startDate,
    ];

    // Use the `execute` method of `mysql2` for prepared statements.
    const [result] = await db.execute(sql, values);
    return result;
  },
};

module.exports = Event;
