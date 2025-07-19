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
  }
];

Dish.insertMany(dishes)
  .then(() => {
    console.log("Sample dishes added");
    mongoose.connection.close();
  });