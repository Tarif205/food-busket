//backend/seed.js
// const mongoose = require('mongoose');
// const Dish = require('./models/Dish');

// mongoose.connect('mongodb://127.0.0.1:27017/foodapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("Connected"));

// const dishes = [
//   {
//     name: 'Biryani',
//     category: 'Non-Veg',
//     ingredients: [
//       { name: 'Rice', price: 50 },
//       { name: 'Chicken', price: 150 },
//       { name: 'Spices', price: 30 }
//     ],
//     instructions: 'Cook rice, marinate chicken...',
//     image: '/images/biryani.jpg'
//   },
//   {
//     name: 'Pasta',
//     category: 'Veg',
//     ingredients: [
//       { name: 'Pasta', price: 40 },
//       { name: 'Tomato Sauce', price: 30 },
//       { name: 'Cheese', price: 50 }
//     ],
//     instructions: 'Boil pasta, add sauce...',
//     image: '/images/pasta.jpg'
//   },
//   {
//     name: 'Veg Burger',
//     category: 'Veg',
//     ingredients: [
//       { name: 'Burger Bun', price: 20 },
//       { name: 'Potato Patty', price: 30 },
//       { name: 'Lettuce', price: 15 },
//       { name: 'Cheese Slice', price: 20 },
//       { name: 'Mayonnaise', price: 10 }
//     ],
//     instructions: 'Assemble bun, patty, and veggies, then grill...',
//     image: '/images/veg-burger.jpg'
//   },
//   {
//     name: 'Mutton Curry',
//     category: 'Non-Veg',
//     ingredients: [
//       { name: 'Mutton', price: 200 },
//       { name: 'Onion', price: 10 },
//       { name: 'Tomato', price: 10 },
//       { name: 'Spices', price: 25 }
//     ],
//     instructions: 'Cook mutton with onions, tomatoes, and spices until tender...',
//     image: '/images/mutton-curry.jpg'
//   }

// ];

// Dish.insertMany(dishes)
//   .then(() => {
//     console.log("Sample dishes added");
//     mongoose.connection.close();
//   });


// backend/seed.js
const mongoose = require('mongoose');
const Dish = require('./models/Dish');

mongoose.connect('mongodb://127.0.0.1:27017/foodapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"));

const dishes = [
  {
    name: 'Biryani',
    category: 'Non-Veg',
    ingredients: [
      { name: 'Rice', quantity: '500g', price: 50 },
      { name: 'Chicken', quantity: '800g', price: 200 },
      { name: 'Spices', quantity: '25g', price: 30 }
    ],
    instructions: [
      'Wash and soak rice for 30 minutes.',
      'Marinate chicken with spices and yogurt for 1 hour.',
      'Fry onions, add marinated chicken, then layer rice and cook on low heat.'
    ],
    image: '/images/biryani.jpg'
  },
  {
    name: 'Pasta Arrabbiata',
    category: 'Veg',
    ingredients: [
      { name: 'Pasta', quantity: '300g', price: 40 },
      { name: 'Tomato Sauce', quantity: '200g', price: 30 },
      { name: 'Chili Flakes', quantity: '5g', price: 10 }
    ],
    instructions: [
      'Boil pasta until al dente.',
      'Heat sauce, add chili flakes and toss with pasta.',
      'Serve hot with grated cheese.'
    ],
    image: '/images/pasta.jpg'
  }
];

Dish.insertMany(dishes)
  .then(() => {
    console.log("Sample dishes added");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });
