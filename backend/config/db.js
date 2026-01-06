// Simple DB connection helper (Mongoose example)
const mongoose = require('mongoose');

const connect = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/delivery';
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('DB connected');
  } catch (err) {
    console.error('DB connection error', err);
    process.exit(1);
  }
};

module.exports = connect;
