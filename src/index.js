// src/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MyCitiverse Email Backend is Running");
});

// Placeholder route to send email (actual function later)
app.post("/send-otp", (req, res) => {
  res.send("OTP sent");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
