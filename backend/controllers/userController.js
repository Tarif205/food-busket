//userController.js
// Import User model
const User = require('../models/User');
const Order = require('../models/Order');
// Import JWT library to create tokens
const jwt = require('jsonwebtoken');

// Simple function to create a token
const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '1d' });
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


// --------- Get User Profile ----------  <<< NEW
exports.getUserProfile = async (req, res) => {  // <<< NEW
  try {  // <<< NEW
    const user = await User.findById(req.user.id).select('-password');  // <<< NEW
    if (user) res.json(user);  // <<< NEW
    else res.status(404).json({ msg: 'User not found' });  // <<< NEW
  } catch (err) {  // <<< NEW
    console.error('Get profile error:', err);  // <<< NEW
    res.status(500).json({ msg: 'Server error fetching profile' });  // <<< NEW
  }  // <<< NEW
};  // <<< NEW

// --------- Update User Profile ----------  <<< NEW
exports.updateUserProfile = async (req, res) => {  // <<< NEW
  try {  // <<< NEW
    const user = await User.findById(req.user.id);  // <<< NEW
    if (user) {  // <<< NEW
      user.name = req.body.name || user.name;  // <<< NEW
      user.email = req.body.email || user.email;  // <<< NEW
      user.address = req.body.address || user.address;  // <<< NEW
      user.number = req.body.number || user.number;  // <<< NEW
      if (req.body.password) user.password = req.body.password;  // <<< NEW

      const updatedUser = await user.save();  // <<< NEW
      res.json({  // <<< NEW
        _id: updatedUser._id,  // <<< NEW
        name: updatedUser.name,  // <<< NEW
        email: updatedUser.email,  // <<< NEW
        address: updatedUser.address,  // <<< NEW
        number: updatedUser.number  // <<< NEW
      });  // <<< NEW
    } else {  // <<< NEW
      res.status(404).json({ msg: 'User not found' });  // <<< NEW
    }  // <<< NEW
  } catch (err) {  // <<< NEW
    console.error('Update profile error:', err);  // <<< NEW
    res.status(500).json({ msg: 'Server error updating profile' });  // <<< NEW
  }  // <<< NEW
};  // <<< NEW

// --------- Get User Order History ----------  <<< NEW
exports.getUserOrders = async (req, res) => {  // <<< NEW
  try {  // <<< NEW
    const orders = await Order.find({ 'user._id': req.user.id });  // <<< NEW
    res.json(orders);  // <<< NEW
  } catch (err) {  // <<< NEW
    console.error('Get orders error:', err);  // <<< NEW
    res.status(500).json({ msg: 'Server error fetching orders' });  // <<< NEW
  }  // <<< NEW
};  // <<< NEW



























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