const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const HealthData = require('../models/HealthData');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tyma-medicore', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

const createSampleUsers = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('👤 Admin user already exists');
      return;
    }

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      username: 'admin',
      email: 'admin@tyma-medicore.com',
      password: adminPassword,
      role: 'admin'
    });
    await adminUser.save();
    console.log('👤 Admin user created successfully');

    // Create analyst user
    const analystPassword = await bcrypt.hash('analyst123', 10);
    const analystUser = new User({
      username: 'analyst',
      email: 'analyst@tyma-medicore.com',
      password: analystPassword,
      role: 'analyst'
    });
    await analystUser.save();
    console.log('👤 Analyst user created successfully');

    // Create official user
    const officialPassword = await bcrypt.hash('official123', 10);
    const officialUser = new User({
      username: 'official',
      email: 'official@tyma-medicore.com',
      password: officialPassword,
      role: 'official'
    });
    await officialUser.save();
    console.log('👤 Official user created successfully');

  } catch (err) {
    console.error('❌ Error creating users:', err.message);
  }
};

const createSampleHealthData = async () => {
  try {
    // Check if data already exists
    const existingData = await HealthData.findOne();
    if (existingData) {
      console.log('📊 Sample health data already exists');
      return;
    }

    const sampleData = [
      {
        date: new Date('2024-01-15'),
        location: 'New York',
        disease: 'COVID-19',
        cases: 150,
        symptoms: ['fever', 'cough', 'fatigue'],
        extra: { severity: 'moderate', transmission_rate: 0.15 }
      },
      {
        date: new Date('2024-01-16'),
        location: 'Los Angeles',
        disease: 'Influenza',
        cases: 89,
        symptoms: ['fever', 'body_aches', 'headache'],
        extra: { severity: 'mild', transmission_rate: 0.08 }
      },
      {
        date: new Date('2024-01-17'),
        location: 'Chicago',
        disease: 'COVID-19',
        cases: 203,
        symptoms: ['fever', 'cough', 'shortness_of_breath'],
        extra: { severity: 'severe', transmission_rate: 0.22 }
      },
      {
        date: new Date('2024-01-18'),
        location: 'Miami',
        disease: 'Dengue',
        cases: 45,
        symptoms: ['fever', 'rash', 'joint_pain'],
        extra: { severity: 'moderate', transmission_rate: 0.05 }
      },
      {
        date: new Date('2024-01-19'),
        location: 'Seattle',
        disease: 'Influenza',
        cases: 67,
        symptoms: ['fever', 'cough', 'sore_throat'],
        extra: { severity: 'mild', transmission_rate: 0.06 }
      },
      {
        date: new Date('2024-01-20'),
        location: 'Boston',
        disease: 'COVID-19',
        cases: 178,
        symptoms: ['fever', 'cough', 'fatigue', 'loss_of_taste'],
        extra: { severity: 'moderate', transmission_rate: 0.18 }
      },
      {
        date: new Date('2024-01-21'),
        location: 'Denver',
        disease: 'RSV',
        cases: 34,
        symptoms: ['cough', 'wheezing', 'difficulty_breathing'],
        extra: { severity: 'moderate', transmission_rate: 0.12 }
      },
      {
        date: new Date('2024-01-22'),
        location: 'Atlanta',
        disease: 'COVID-19',
        cases: 156,
        symptoms: ['fever', 'cough', 'headache'],
        extra: { severity: 'moderate', transmission_rate: 0.16 }
      }
    ];

    await HealthData.insertMany(sampleData);
    console.log('📊 Sample health data created successfully');

  } catch (err) {
    console.error('❌ Error creating health data:', err.message);
  }
};

const setupDatabase = async () => {
  console.log('🚀 Starting database setup...');
  
  await connectDB();
  await createSampleUsers();
  await createSampleHealthData();
  
  console.log('✅ Database setup completed successfully!');
  console.log('\n📋 Login Credentials:');
  console.log('👤 Admin: username=admin, password=admin123');
  console.log('👤 Analyst: username=analyst, password=analyst123');
  console.log('👤 Official: username=official, password=official123');
  
  process.exit(0);
};

setupDatabase(); 