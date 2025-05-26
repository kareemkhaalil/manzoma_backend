const pool = require("../db");

exports.create = async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO clients (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating client", details: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clients");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error getting clients", details: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clients WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Client not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error getting client", details: err.message });
  }
};

exports.update = async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE clients SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating client", details: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query("DELETE FROM clients WHERE id = $1", [req.params.id]);
    res.json({ message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting client", details: err.message });
  }
};
