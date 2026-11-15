
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Database connection
require("./database/db");

// Import routes
const gymRoutes = require("./routes/gymRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        project: "FitNest Gym",
        message: "Locker Room Management API",
        status: "Server is running successfully"
    });
});

// API routes
app.use("/", gymRoutes);

// Server port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`FitNest Gym server running on port ${PORT}`);
});
