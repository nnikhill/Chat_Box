const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const jwt = require('jsonwebtoken');
const config = require('config'); // or use dotenv if you prefer

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.get('jwtSecret'), {
    expiresIn: '30d', // token expires in 30 days
  });
};

module.exports = generateToken;


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};


module.exports = connectDB;
