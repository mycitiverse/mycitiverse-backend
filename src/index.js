const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sendEmail = require("./utils/emailSender");
const { saveOTP, verifyOTP } = require("./otpStore");

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
  saveOTP(email, otp); // save in memory

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
    res.status(200).json({ message: "OTP sent successfully" }); // Only return OTP for testing
  } else {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP required" });
  }

  const isValid = verifyOTP(email, otp);

  if (isValid) {
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ error: "Invalid or expired OTP" });
  }
});


// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
