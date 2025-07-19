const express = require('express');
const router = express.Router();
const { getDishes, getDishById } = require('../controllers/dishController');

router.get('/', getDishes);
router.get('/:id', getDishById);

module.exports = router;