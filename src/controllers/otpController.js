const sendEmail = require("../utils/emailSender");
const db = require("../firebase");

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const createdAt = Date.now();

  await db.collection("otps").doc(email).set({ otp, createdAt });

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

  if (success) res.status(200).json({ message: "OTP sent successfully" });
  else res.status(500).json({ error: "Failed to send OTP" });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: "Email and OTP required" });

  try {
    const doc = await db.collection("otps").doc(email).get();

    if (!doc.exists) return res.status(400).json({ error: "OTP not found or expired" });

    const data = doc.data();
    const now = Date.now();
    const age = now - data.createdAt;

    if (age > 5 * 60 * 1000) {
      await db.collection("otps").doc(email).delete();
      return res.status(400).json({ error: "OTP expired" });
    }

    if (String(data.otp) !== String(otp)) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    await db.collection("otps").doc(email).delete();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP verify error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
