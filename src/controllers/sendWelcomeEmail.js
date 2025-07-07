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
            <img src="https://res.cloudinary.com/ddanfyxo1/image/upload/v1751862883/MyCitiverse_LOGO_usvpxj.png" alt="MyCitiverse Logo" style="width: 120px;" />
          </div>

          <h2 style="color: #333; text-align: center;">Hey ${name}, Welcome to <span style="color: #FFD700;">MyCitiverse!</span></h2>
          
          <p style="font-size: 16px; color: #444; line-height: 1.6;">
        We’re truly excited to have you on board. 🎉 <br />
        MyCitiverse is your gateway to discovering the best of your city — from local events to community services, all in one place.
      </p>

      <p style="font-size: 16px; color: #444; line-height: 1.6;">
        Begin your journey today and connect with what's happening around you.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://www.mycitiverse.com" target="_blank" style="background-color: #FFD700; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
          🚀 Explore Now
        </a>
      </div>

      <p style="font-size: 16px; color: #444;">Warm wishes,<br/><strong>Team MyCitiverse</strong></p>
    </div>

        <div style="max-width: 600px; margin: auto; text-align: center; padding: 20px; color: #777; font-size: 13px;">
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
          <p>Need help? Contact us at <a href="mailto:mycitiverse@gmail.com" style="color: #2E86C1;">mycitiverse@gmail.com</a></p>
          <p>Follow us on 
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
      subject: "🎉 Welcome to MyCitiverse – Let’s Explore Your City Together!",
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
