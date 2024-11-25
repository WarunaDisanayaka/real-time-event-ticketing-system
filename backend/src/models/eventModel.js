const db = require("../config/db");

const Event = {
  create: async (eventData) => {
    const sql = `
      INSERT INTO events (name, totalTickets, ticketsAvailable, ticketReleaseRate, customerRetrievalRate, status, startDate, image, vendorId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      eventData.vendorId, // Add vendorId to the values
    ];

    const [result] = await db.execute(sql, values); // Use db.execute to execute the query
    return result;
  },

  getAll: async () => {
    const sql = "SELECT * FROM events";
    const [rows] = await db.execute(sql); // Execute the query and get the result
    return rows;
  },

  getByVendorId: async (vendorId) => {
    const sql = "SELECT * FROM events WHERE vendorId = ?";
    const [rows] = await db.execute(sql, [vendorId]); // Execute the query and get the result for the specific vendor
    return rows;
  },
};

module.exports = Event;
