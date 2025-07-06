// src/otpStore.js

// In-memory store: { email: { otp, expiresAt } }
const otpStore = new Map();

// Save OTP
function saveOTP(email, otp) {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore.set(email, { otp, expiresAt });
}

// Verify OTP
function verifyOTP(email, inputOtp) {
  const record = otpStore.get(email);
  if (!record) return false;

  const { otp, expiresAt } = record;

  // Expired
  if (Date.now() > expiresAt) {
    otpStore.delete(email);
    return false;
  }

  const isMatch = otp.toString() === inputOtp.toString();
  if (isMatch) otpStore.delete(email); // one-time use
  return isMatch;
}

module.exports = { saveOTP, verifyOTP };
