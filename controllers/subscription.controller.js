const pool = require("../db");

exports.create = async (req, res) => {
  const { name, duration, price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO subscriptions (name, duration, price) VALUES ($1, $2, $3) RETURNING *",
      [name, duration, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating subscription" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM subscriptions");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching subscriptions" });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM subscriptions WHERE id = $1", [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching subscription" });
  }
};

exports.update = async (req, res) => {
  const { name, duration, price } = req.body;
  try {
    const result = await pool.query(
      "UPDATE subscriptions SET name = $1, duration = $2, price = $3 WHERE id = $4 RETURNING *",
      [name, duration, price, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating subscription" });
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query("DELETE FROM subscriptions WHERE id = $1", [req.params.id]);
    res.json({ message: "Subscription deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting subscription" });
  }
};
