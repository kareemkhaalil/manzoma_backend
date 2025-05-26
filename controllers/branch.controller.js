const pool = require("../db");

exports.create = async (req, res) => {
  const { name, location } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO branches (name, location) VALUES ($1, $2) RETURNING *",
      [name, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating branch" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM branches");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching branches" });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM branches WHERE id = $1", [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching branch" });
  }
};

exports.update = async (req, res) => {
  const { name, location } = req.body;
  try {
    const result = await pool.query(
      "UPDATE branches SET name = $1, location = $2 WHERE id = $3 RETURNING *",
      [name, location, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error updating branch" });
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query("DELETE FROM branches WHERE id = $1", [req.params.id]);
    res.json({ message: "Branch deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting branch" });
  }
};
