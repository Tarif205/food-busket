// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
  dishName: String,
  ingredients: [
    {
      name: String,
      quantity: String,
      price: Number,
      selectedQty: Number
    }
  ],
  itemTotal: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartItemSchema);
