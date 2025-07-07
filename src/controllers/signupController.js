const db = require("../firebase");
const sendEmail = require("../utils/emailSender");

exports.signupUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await db.collection("users").doc(email).set({
      name,
      email,
      phone,
      password,
      createdAt: Date.now(),
    });

    const html = `
      <h2>Welcome to MyCitiverse, ${name}!</h2>
      <p>Thank you for signing up. We're excited to have you!</p>
      <p>🎉 Start exploring your city with MyCitiverse now!</p>
    `;

    const success = await sendEmail({
      to: email,
      subject: "Welcome to MyCitiverse 🎉",
      html,
    });

    if (!success) return res.status(500).json({ error: "Signup succeeded but email failed" });

    res.status(200).json({ message: "User signed up and welcome email sent" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Signup failed" });
  }
};
