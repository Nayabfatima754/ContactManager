const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = ess.env.MONGODprocB_URL_LOCAL || process.env.MONGODB_URL;
//const mongoUrl = 'mongodb+srv://nodeTutorial:nodetutorial123@cluster0.six88.mongodb.net/'
//const mongoUrl = process.env.MONGODB_URL;


mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log("Connected to MongoDB server");
});

db.on('error', (err) => {
  console.error("MongoDB server connection error", err); // Include the error message
});

db.on('disconnected', () => {
  console.log("Disconnected from MongoDB server");
});

module.exports = db;
