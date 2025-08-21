//dishController.js
// const Dish = require('../models/Dish');

// const getDishes = async (req, res) => {
//   const dishes = await Dish.find();
//   res.json(dishes);
// };

// const getDishById = async (req, res) => {
//   const dish = await Dish.findById(req.params.id);
//   res.json(dish);
// };

// module.exports = { getDishes, getDishById };

//8/20/25
// backend/controllers/dishController.js
const Dish = require('../models/Dish');

const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching dishes' });
  }
};

const getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.json(dish);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching dish' });
  }
};

module.exports = { getDishes, getDishById };
