const sendEmail = require("../utils/emailSender");
const db = require("../firebase");

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const createdAt = Date.now();

  await db.collection("otps").doc(email).set({ otp, createdAt });

  const html = `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      
      <!-- Optional Logo -->
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://res.cloudinary.com/ddanfyxo1/image/upload/v1751862883/MyCitiverse_LOGO_usvpxj.png" alt="MyCitiverse Logo" style="width: 120px;"/>
      </div>

      <h2 style="color: #FFD700; text-align: center;">OTP Verification - MyCitiverse</h2>
      
      <p style="font-size: 16px; color: #333;">Dear User,</p>
      
      <p style="font-size: 16px; color: #333;">
        Thank you for choosing <strong>MyCitiverse</strong>. To continue with your request, please use the following One-Time Password (OTP):
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <h1 style="font-size: 36px; color: #FFD700;">${otp}</h1>
      </div>

      <p style="font-size: 16px; color: #333;">
        <strong>Important:</strong> This OTP is valid for <strong>5 minutes</strong> only. Do not share it with anyone to keep your account secure.
      </p>

      <p style="font-size: 16px; color: #333;">
        If you did not request this OTP, please ignore this email. No further action is required.
      </p>

      <br/>

      <p style="font-size: 16px; color: #333;">
        Warm regards,<br/>
        <strong>Team MyCitiverse</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="max-width: 600px; margin: auto; text-align: center; padding: 20px; color: #777; font-size: 13px;">
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
      <p>Need help? Contact us at <a href="mailto:mycitiverse@gmail.com" style="color: #2E86C1;">mycitiverse@gmail.com</a></p>
      <p>
        Follow us:
        <a href="https://www.instagram.com/mycitiverse" style="color: #2E86C1; text-decoration: none;">Instagram</a> |
        <a href="https://facebook.com/MyCitiverse" style="color: #2E86C1; text-decoration: none;">Facebook</a> |
        <a href="https://twitter.com/MyCitiverse" style="color: #2E86C1; text-decoration: none;">Twitter</a> |
        <a href="https://www.linkedin.com/company/mycitiverse" style="color: #2E86C1; text-decoration: none;">LinkedIn</a> |
        <a href="https://www.youtube.com/@MyCitiverse" style="color: #2E86C1; text-decoration: none;">Youtube</a>
      </p>
      <p>© ${new Date().getFullYear()} MyCitiverse Technologies Pvt. Ltd. All rights reserved.</p>
    </div>
  </div>
`;

const success = await sendEmail({
  to: email,
  subject: "Your OTP for MyCitiverse Verification",
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
