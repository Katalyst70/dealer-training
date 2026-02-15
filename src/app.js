const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/errorHandler");

const requestLogger = require("./middleware/requestLogger");


const app = express();

/**
 * Global Middleware
 */
app.use(cors());
app.use(express.json());
app.use(requestLogger);


/**
 * Routes
 */
app.use("/api/auth", authRoutes);

/**
 * Health Check
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/**
 * Global Error Handler (must be last)
 */
app.use(errorHandler);

module.exports = app;
