const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔗 MongoDB Connection Setup');
console.log('==========================');
console.log('');

console.log('📋 Instructions:');
console.log('1. Go to MongoDB Atlas: https://cloud.mongodb.com');
console.log('2. Click on your "tyma-medicore" cluster');
console.log('3. Click "Connect" → "Connect your application"');
console.log('4. Copy the connection string');
console.log('');

rl.question('📋 Paste your MongoDB connection string here: ', (connectionString) => {
  // Clean up the connection string
  let cleanString = connectionString.trim();
  
  // Add database name if not present
  if (!cleanString.includes('/tyma-medicore')) {
    cleanString = cleanString.replace('/?retryWrites', '/tyma-medicore?retryWrites');
  }
  
  // Create .env content
  const envContent = `MONGO_URI=${cleanString}
PORT=5000
JWT_SECRET=mysecretkey123
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:3000
`;

  // Write to .env file
  const envPath = path.join(__dirname, '.env');
  fs.writeFileSync(envPath, envContent);
  
  console.log('');
  console.log('✅ .env file created successfully!');
  console.log('');
  console.log('📁 File location:', envPath);
  console.log('');
  console.log('🚀 Next steps:');
  console.log('1. Start your backend: npm run dev');
  console.log('2. You should see "MongoDB connected"');
  console.log('');
  
  rl.close();
}); 