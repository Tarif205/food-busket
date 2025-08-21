// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getCartItems,
  addToCart,
  removeCartItem,
  checkoutCart
} = require('../controllers/cartController');

router.get('/', protect, getCartItems);
router.post('/', protect, addToCart);
router.delete('/:id', protect, removeCartItem);
router.post('/checkout', protect, checkoutCart);

module.exports = router;

// ---------------- CHECKOUT CART ----------------
router.post('/checkout', protect, async (req, res) => {
  try {
    // 1️⃣ Fetch the user's cart items
    const cartItems = await Cart.find({ user: mongoose.Types.ObjectId(req.user.id) });
    if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty' });

    // 2️⃣ Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.itemTotal || 0), 0);

    // 3️⃣ Create an order
    const order = new Order({
      user: {
        _id: req.user.id,
        name: req.user.name || '', // optional if you store name in req.user
        phone: req.user.number || '',
        address: req.user.address || ''
      },
      items: cartItems.map(ci => ({
        dishId: ci.dishId,
        dishName: ci.dishName,
        ingredients: ci.ingredients,
        itemTotal: ci.itemTotal
      })),
      totalPrice
    });

    await order.save();

    // 4️⃣ Delete all cart items for this user
    await Cart.deleteMany({ user: mongoose.Types.ObjectId(req.user.id) });

    res.json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error('Checkout error:', err);
    res.status(500).json({ message: 'Server error during checkout' });
  }
});

module.exports = router;