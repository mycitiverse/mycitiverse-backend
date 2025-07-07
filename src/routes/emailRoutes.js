const express = require("express");
const router = express.Router();
const { sendWelcomeEmail } = require("../controllers/sendWelcomeEmail");

// POST /api/sendWelcomeEmail
router.post("/sendWelcomeEmail", sendWelcomeEmail);

module.exports = router;
