const mongoose = require('mongoose');
const Dish = require('./models/Dish');

mongoose.connect('mongodb://127.0.0.1:27017/foodapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected"));

const dishes = [
  {
    name: 'Biryani',
    category: 'Non-Veg',
    ingredients: [
      { name: 'Rice', price: 50 },
      { name: 'Chicken', price: 150 },
      { name: 'Spices', price: 30 }
    ],
    instructions: 'Cook rice, marinate chicken...',
    image: '/images/biryani.jpg'
  },
  {
    name: 'Pasta',
    category: 'Veg',
    ingredients: [
      { name: 'Pasta', price: 40 },
      { name: 'Tomato Sauce', price: 30 },
      { name: 'Cheese', price: 50 }
    ],
    instructions: 'Boil pasta, add sauce...',
    image: '/images/pasta.jpg'
  },
  {
    name: 'Veg Burger',
    category: 'Veg',
    ingredients: [
      { name: 'Burger Bun', price: 20 },
      { name: 'Potato Patty', price: 30 },
      { name: 'Lettuce', price: 15 },
      { name: 'Cheese Slice', price: 20 },
      { name: 'Mayonnaise', price: 10 }
    ],
    instructions: 'Assemble bun, patty, and veggies, then grill...',
    image: '/images/veg-burger.jpg'
  },
  {
    name: 'Mutton Curry',
    category: 'Non-Veg',
    ingredients: [
      { name: 'Mutton', price: 200 },
      { name: 'Onion', price: 10 },
      { name: 'Tomato', price: 10 },
      { name: 'Spices', price: 25 }
    ],
    instructions: 'Cook mutton with onions, tomatoes, and spices until tender...',
    image: '/images/mutton-curry.jpg'
  }

];

Dish.insertMany(dishes)
  .then(() => {
    console.log("Sample dishes added");
    mongoose.connection.close();
  });