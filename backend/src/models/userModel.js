const db = require("../config/db");

const User = {
  async findByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },
  async create(user) {
    const { name, email, password, role } = user;
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, password, role]
    );
    return result.insertId;
  },
};

module.exports = User;
