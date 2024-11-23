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

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = Event;
