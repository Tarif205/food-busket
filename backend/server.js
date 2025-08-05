// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();
// const userRoutes = require('./routes/userRoutes');

// const dishRoutes = require('./routes/dishRoutes');
// const orderRoutes = require('./routes/orderRoutes');



// const app = express();
// app.use('/api/orders', orderRoutes);
// app.use(cors());
// app.use(express.json());
// app.use('/api/users', userRoutes);
// // MongoDB Connection
// mongoose.connect('mongodb://127.0.0.1:27017/foodapp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error(err));

// app.use('/api/dishes', dishRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const dishRoutes = require('./routes/dishRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// ✅ CORS config: Allow requests from your frontend (127.0.0.1:5500)
app.use(cors({
  origin: 'http://127.0.0.1:5500', // adjust if you're running from localhost
  credentials: true, // optional, if you're sending cookies or sessions
}));

app.use(express.json());

// ✅ Routes (after CORS)
app.use('/api/users', userRoutes);
app.use('/api/dishes', dishRoutes);
app.use('/api/orders', orderRoutes);

// ✅ MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/foodapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
