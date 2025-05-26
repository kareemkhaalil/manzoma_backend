const pool = require("../db");

exports.checkin = async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO attendance (user_id, checkin_time) VALUES ($1, NOW()) RETURNING *",
      [user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Check-in failed" });
  }
};

exports.checkout = async (req, res) => {
  const { user_id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE attendance SET checkout_time = NOW() WHERE user_id = $1 AND checkout_time IS NULL RETURNING *",
      [user_id]
    );
    if (result.rows.length === 0) return res.status(400).json({ error: "No active check-in" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Check-out failed" });
  }
};

exports.getReport = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT users.name, attendance.* FROM attendance JOIN users ON users.id = attendance.user_id ORDER BY attendance.checkin_time DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching report" });
  }
};
