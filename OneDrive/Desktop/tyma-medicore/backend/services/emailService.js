// Dummy email service for development (no real emails sent)
const sendVerificationEmail = async () => Promise.resolve();
const sendWelcomeEmail = async () => Promise.resolve();

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail
}; 