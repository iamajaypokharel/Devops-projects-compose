const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.get("/", (req, res) => {
      res.send("Backend is running!");
    });

    app.get("/api", (req, res) => {
      res.send("Hello from Backend! 🚀");
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
