const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sendEmail = require("./utils/emailSender");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("MyCitiverse Email Backend is Running");
});

// === OTP Route ===
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  const html = `
    <h3>OTP Verification - MyCitiverse</h3>
    <p>Your One-Time Password (OTP) is:</p>
    <h2>${otp}</h2>
    <p>This OTP is valid for 5 minutes.</p>
  `;

  const success = await sendEmail({
    to: email,
    subject: "Your MyCitiverse OTP Code",
    html,
  });

  if (success) {
    res.status(200).json({ message: "OTP sent successfully", otp }); // Only return OTP for testing
  } else {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
