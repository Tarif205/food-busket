// const Order = require('../models/Order');

// exports.placeOrder = async (req, res) => {
//   const { ingredients, totalPrice } = req.body;

//   const order = new Order({
//     user: req.user._id,
//     ingredients,
//     totalPrice
//   });

//   await order.save();
//   res.json({ msg: 'Order placed successfully' });
// };

//controllers/orderController.js
const User = require('../models/User');
const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  const { ingredients, totalPrice } = req.body;

  try {
    const user = await User.findById(req.user.id); // req.user is decoded from JWT

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const order = new Order({
      user: {
        _id: user._id,
        name: user.name,
        phone: user.number,
        address: user.address
      },
      orderList: ingredients,
      totalPrice
    });

    await order.save();

    res.status(201).json({ msg: 'Order placed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error while placing order' });
  }
};


// controllers/orderController.js part 2
// const User = require('../models/User');
// const Order = require('../models/Order');

// exports.placeOrder = async (req, res) => {
//   const { ingredients, totalPrice } = req.body;

//   try {
//     console.log('➡️ Order Body:', req.body);
//     console.log('➡️ Decoded User from JWT:', req.user);

//     // Load full user info from DB
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       console.log("❌ User not found in DB");
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
//     console.log("✅ Order Saved:", order);
//     res.status(201).json({ msg: 'Order placed successfully' });

//   } catch (err) {
//     console.error("❌ Error placing order:", err);
//     res.status(500).json({ msg: 'Server error while placing order' });
//   }
// };

// //part 3

// const User = require('../models/User');
// const Order = require('../models/Order');

// exports.placeOrder = async (req, res) => {
//   const { userId, ingredients, totalPrice } = req.body;

//   try {
//     const user = await User.findById(userId);
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
//     res.status(201).json({ msg: 'Order placed successfully', order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error while placing order' });
//   }
// };
