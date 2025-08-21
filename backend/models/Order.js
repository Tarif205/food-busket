//Order.js
// models/Order.js
// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   user: {
//     _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     name: String,
//     phone: String,
//     address: String
//   },
//   orderList: [
//     {
//       name: String,
//       price: Number
//     }
//   ],
//   totalPrice: Number,
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Order', orderSchema);


//8/20/25
// backend/models/Order.js
const mongoose = require('mongoose');

const orderedIngredientSchema = new mongoose.Schema({
  name: String,
  quantity: String, // snapshot from dish ingredient
  price: Number,
  selectedQty: Number // quantity the user selected (numeric multiplier)
});

const orderItemSchema = new mongoose.Schema({
  dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: false },
  dishName: String,
  ingredients: [orderedIngredientSchema],
  itemTotal: Number
});

const orderSchema = new mongoose.Schema({
  user: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    phone: String,
    address: String
  },
  items: [orderItemSchema],
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
