const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, role, branch_id } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role, branch_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, hashedPassword, role || 'worker', branch_id || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({
      error: "Error registering user",
      details: err.message, // ⬅️ دي اللي هتساعدنا نعرف الخطأ بالضبط
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: "Invalid email" });

    const isValid = await bcrypt.compare(password, result.rows[0].password);
    if (!isValid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
};
