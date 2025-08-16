
// orderRoutes.js
const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, placeOrder);
module.exports = router;


// //new part
// const express = require('express');
// const router = express.Router();
// const { placeOrder } = require('../controllers/orderController');

// router.post('/', placeOrder); // just call the controller directly

// module.exports = router;