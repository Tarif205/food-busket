// //Dish.js
// const mongoose = require('mongoose');

// const ingredientSchema = new mongoose.Schema({
//   name: String,
//   price: Number
// });

// const dishSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: String,
//   ingredients: [ingredientSchema],
//   instructions: String,
//   image: String
// });

// module.exports = mongoose.model('Dish', dishSchema);


// 8/20/25
// backend/models/Dish.js
const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, default: "" }, // e.g., "200g", "4 pcs"
  price: { type: Number, default: 0 }
});

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  ingredients: [ingredientSchema],
  instructions: [String], // array of steps
  image: String
});

module.exports = mongoose.model('Dish', dishSchema);