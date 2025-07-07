// routes/sendWelcomeEmail.js or controller/sendWelcomeEmail.js

const sendEmail = require("../utils/emailSender");

exports.sendWelcomeEmail = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/vYOUR_VERSION/mycitiverse_logo.png" alt="MyCitiverse Logo" style="width: 120px;" />
          </div>

          <h2 style="color: #2E86C1; text-align: center;">Welcome to MyCitiverse, ${name}!</h2>
          
          <p style="font-size: 16px; color: #333;">Thank you for signing up with <strong>MyCitiverse</strong>. We're thrilled to have you onboard!</p>

          <p style="font-size: 16px; color: #333;">🎉 Start exploring events, local services, and your city in a whole new way.</p>

          <br/>
          <p style="font-size: 16px; color: #333;">Warm regards,<br/><strong>Team MyCitiverse</strong></p>
        </div>

        <div style="max-width: 600px; margin: auto; text-align: center; padding: 20px; color: #777; font-size: 13px;">
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
          <p>Need help? Contact us at <a href="mailto:support@mycitiverse.com" style="color: #2E86C1;">support@mycitiverse.com</a></p>
          <p>Follow us on 
            <a href="https://instagram.com/mycitiverse" style="color: #2E86C1;">Instagram</a>, 
            <a href="https://facebook.com/mycitiverse" style="color: #2E86C1;">Facebook</a>
          </p>
          <p>© ${new Date().getFullYear()} MyCitiverse Technologies Pvt. Ltd.</p>
        </div>
      </div>
    `;

    const success = await sendEmail({
      to: email,
      subject: "🎉 Welcome to MyCitiverse!",
      html,
    });

    if (!success) {
      console.error("Email send failed:", email);
      return res.status(500).json({ error: "Failed to send welcome email." });
    }

    res.status(200).json({ message: "Welcome email sent successfully." });

  } catch (error) {
    console.error("Send Welcome Email Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
