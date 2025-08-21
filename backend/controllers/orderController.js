// //controllers/orderController.js
// const User = require('../models/User');
// const Order = require('../models/Order');

// exports.placeOrder = async (req, res) => {
//   console.log("🚀 req.user:", req.user); // debug
//   const { ingredients, totalPrice } = req.body;

//   try {
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const order = new Order({
//       user: {
//         _id: user._id,
//         name: user.name,
//         phone: user.number,
//         address: user.address
//       },
//       orderList: ingredients,
//       totalPrice
//     });

//     await order.save();
//     console.log("✅ Order saved:", order); // debug

//     res.status(201).json({ msg: 'Order placed successfully' });
//   } catch (err) {
//     console.error('❌ Error placing order:', err);
//     res.status(500).json({ msg: 'Server error while placing order' });
//   }
// };


//8/20/25
// backend/controllers/orderController.js
// backend/controllers/orderController.js
const User = require('../models/User');
const Order = require('../models/Order');
const Dish = require('../models/Dish');

exports.placeOrder = async (req, res) => {
  try {
    // req.user set by auth middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Support two payload formats:
    // 1) cart: [{ dishId, ingredients:[{name,quantity,price,selectedQty}], itemTotal }]
    // 2) single item: { dishId, ingredients: [...], totalPrice }
    let items = [];
    let totalPrice = 0;

    if (Array.isArray(req.body.cart) && req.body.cart.length > 0) {
      // from cart page
      items = req.body.cart.map(ci => {
        totalPrice += Number(ci.itemTotal || 0);
        return {
          dishId: ci.dishId,
          dishName: ci.dishName,
          ingredients: ci.ingredients,
          itemTotal: ci.itemTotal
        };
      });
    } else if (req.body.dishId && Array.isArray(req.body.ingredients)) {
      // single-dish add-to-cart flow (POST directly)
      const itemTotal = Number(req.body.totalPrice || 0);
      totalPrice = itemTotal;
      items.push({
        dishId: req.body.dishId,
        dishName: req.body.dishName || '',
        ingredients: req.body.ingredients,
        itemTotal
      });
    } else {
      return res.status(400).json({ message: 'Invalid order payload' });
    }

    const order = new Order({
      user: {
        _id: user._id,
        name: user.name,
        phone: user.number,
        address: user.address
      },
      items,
      totalPrice
    });

    await order.save();

    res.status(201).json({ msg: 'Order placed successfully', orderId: order._id });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ message: 'Server error while placing order' });
  }
};
