//userController.js
// Import User model
const User = require('../models/User');

// Import JWT library to create tokens
const jwt = require('jsonwebtoken');

// Simple function to create a token
const generateToken = (id) => {
  // Create a token with user id and a secret key
  return jwt.sign({ id: id }, 'secretKey', { expiresIn: '1d' });
};

// ----------- Register a new user ----------
exports.register = async (req, res) => {
  const { name, email, password, address, number } = req.body; // ⬅️ get all fields

  // Check if the user already exists by email
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  // Create a new user and save to DB
  const newUser = await User.create({ name, email, password, address, number });

  // Send back a token to the client
  res.json({ token: generateToken(newUser._id) });
};

// ----------- Login an existing user ----------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email: email });

  // Check if user exists and password matches
  if (!user || !user.matchPassword(password)) {
    return res.status(401).json({ msg: 'Invalid email or password' });
  }

  // Send back a token
  res.json({ token: generateToken(user._id) });
};


// // controllers/userController.js
// const User = require('../models/User');

// // ----------- Login an existing user ----------
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const user = await User.findOne({ email });

//     // Check if user exists and password matches
//     if (!user || !user.matchPassword(password)) {
//       return res.status(401).json({ msg: 'Invalid email or password' });
//     }

//     // Send back user info (without password)
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       address: user.address,
//       number: user.number
//     });

//   } catch (err) {
//     console.error('❌ Login error:', err);
//     res.status(500).json({ msg: 'Server error while logging in' });
//   }
// };