//dishController.js
const Dish = require('../models/Dish');

const getDishes = async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
};

const getDishById = async (req, res) => {
  const dish = await Dish.findById(req.params.id);
  res.json(dish);
};

module.exports = { getDishes, getDishById };