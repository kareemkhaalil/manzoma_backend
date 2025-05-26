// ✅ app.js - نقطة دخول التطبيق
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const superAdminRoutes = require("./routes/superAdmin.routes");
const clientRoutes = require("./routes/client.routes");
const subscriptionRoutes = require("./routes/subscription.routes");
const branchRoutes = require("./routes/branch.routes");
const userRoutes = require("./routes/user.routes");
const attendanceRoutes = require("./routes/attendance.routes");

app.use("/api/super-admins", superAdminRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
