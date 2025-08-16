//Dish.js
const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  ingredients: [ingredientSchema],
  instructions: String,
  image: String
});

module.exports = mongoose.model('Dish', dishSchema);