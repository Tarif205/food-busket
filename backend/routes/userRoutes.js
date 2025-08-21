// userRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, getUserProfile, updateUserProfile, getUserOrders } = require('../controllers/userController'); // <<< NEW
//const { register, login } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // <<< NEW if not already imported
router.post('/register', register);
router.post('/login', login);

// --------- New routes for profile and orders ----------
router.get('/profile', protect, getUserProfile);          // <<< NEW
router.put('/profile', protect, updateUserProfile);       // <<< NEW
router.get('/orders', protect, getUserOrders);            // <<< NEW


module.exports = router;