const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const email = process.argv[2];
if (!email) {
  console.error('Usage: node deleteUserByEmail.js <email>');
  process.exit(1);
}

async function main() {
  try {
    await connectDB();
    const result = await User.deleteOne({ email });
    if (result.deletedCount === 0) {
      console.log(`No user found with email: ${email}`);
    } else {
      console.log(`User with email ${email} deleted.`);
    }
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error deleting user:', err);
    process.exit(1);
  }
}

main(); 