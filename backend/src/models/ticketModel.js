const db = require("../config/db");

// Create a new ticket for an event
const createTicket = (
  eventId,
  customerId,
  ticketType,
  price,
  status,
  callback
) => {
  const query = `INSERT INTO tickets (event_id, customer_id, ticket_type, price, status) VALUES (?, ?, ?, ?, ?)`;
  db.query(
    query,
    [eventId, customerId, ticketType, price, status],
    (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    }
  );
};

// Update ticket status (sold, cancelled, used)
const updateTicketStatus = (ticketId, status, callback) => {
  const query = `UPDATE tickets SET status = ? WHERE id = ?`;
  db.query(query, [status, ticketId], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

// Get tickets for a specific event
const getTicketsByEvent = (eventId, callback) => {
  const query = `SELECT * FROM tickets WHERE event_id = ?`;
  db.query(query, [eventId], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  createTicket,
  updateTicketStatus,
  getTicketsByEvent,
};
