//cartController.js
const express = require('express');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const User = require('../models/User');

// GET all cart items for user
exports.getCartItems = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching cart' });
  }
};

// ADD item to cart
exports.addToCart = async (req, res) => {
  try {
    const { dishId, dishName, ingredients, itemTotal } = req.body;
    if (!dishId || !dishName || !ingredients || !itemTotal) {
      return res.status(400).json({ message: 'Invalid cart data' });
    }

    const cartItem = new Cart({
      user: req.user.id,
      dishId,
      dishName,
      ingredients,
      itemTotal
    });

    await cartItem.save();

    // Return updated cart count
    const cart = await Cart.find({ user: req.user.id });
    res.status(201).json({ cartItem, cartCount: cart.length });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding to cart' });
  }
};

// REMOVE item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({ _id: req.params.id, user: req.user.id });
    if (!cartItem) return res.status(404).json({ message: 'Item not found' });

    await cartItem.remove();

    const cart = await Cart.find({ user: req.user.id });
    res.json({ message: 'Item removed', cartCount: cart.length });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error removing cart item' });
  }
};

// CHECKOUT cart
exports.checkoutCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.user.id });
    if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty' });

    const user = await User.findById(req.user.id);

    const order = new Order({
      user: {
        _id: user._id,
        name: user.name,
        phone: user.number,
        address: user.address
      },
      items: cartItems.map(ci => ({
        dishId: ci.dishId,
        dishName: ci.dishName,
        ingredients: ci.ingredients,
        itemTotal: ci.itemTotal
      })),
      totalPrice: cartItems.reduce((sum, item) => sum + item.itemTotal, 0)
    });

    await order.save();

    // Clear cart
    await Cart.deleteMany({ user: req.user.id });

    res.json({ message: 'Order placed successfully', orderId: order._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Checkout error' });
  }
};
