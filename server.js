const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to log user visits
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - ${req.ip}\n`;
    fs.appendFile("visits.log", logEntry, (err) => {
        if (err) console.error("Error logging visit:", err);
    });
    next();
});

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// API Endpoint to retrieve logs
app.get("/logs", (req, res) => {
    fs.readFile("visits.log", "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading log file" });
        }
        const logs = data.split("\n").filter(line => line).map(line => {
            const [time, ip] = line.split(" - ");
            return { time, ip };
        });
        res.json(logs);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


