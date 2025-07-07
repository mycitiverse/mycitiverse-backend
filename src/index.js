const express = require("express");
const cors = require("cors");
require("dotenv").config();

const otpRoutes = require("./routes/otpRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://mycitiverse.vercel.app"], // replace with your actual frontend
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MyCitiverse Email Backend is Running");
});

// Routes
app.use("/", otpRoutes);
app.use("/api", emailRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
