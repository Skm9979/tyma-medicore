require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

async function checkDb() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    const collections = ['healthdatas', 'symptomreports', 'users'];

    for (const name of collections) {
      const exists = await db.listCollections({ name }).hasNext();
      if (!exists) {
        console.log(`\n❌ Collection '${name}' does not exist.`);
        continue;
      }
      const docs = await db.collection(name).find({}).limit(5).toArray();
      console.log(`\n--- ${name} (showing up to 5 documents) ---`);
      if (docs.length === 0) {
        console.log('No documents found.');
      } else {
        docs.forEach((doc, i) => {
          console.log(`Document ${i + 1}:`, doc);
        });
      }
    }
    await mongoose.disconnect();
    console.log('\n✅ Done.');
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

checkDb(); 