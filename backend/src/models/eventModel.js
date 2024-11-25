const db = require("../config/db");

const Event = {
  create: async (eventData) => {
    const sql = `
      INSERT INTO events (name, totalTickets, ticketsAvailable, ticketReleaseRate, customerRetrievalRate, status, startDate, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      eventData.name,
      eventData.totalTickets,
      eventData.ticketsAvailable,
      eventData.ticketReleaseRate,
      eventData.customerRetrievalRate,
      eventData.status,
      eventData.startDate,
      eventData.image, // Add the image URL or file path
    ];

    const [result] = await db.execute(sql, values);
    return result;
  },
};

module.exports = Event;
