// backend/middleware/authMiddleware.js

// const jwt = require('jsonwebtoken');

// // Middleware to protect routes
// const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith('Bearer')) {
//     const token = authHeader.split(' ')[1];

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = { id: decoded.id }; // Add user payload to the request object
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: 'Token is invalid or expired' });
//     }
//   } else {
//     return res.status(401).json({ message: 'No token provided' });
//   }
// };

// module.exports = { protect };

//authMiddleware.js
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // includes `id`
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalid or expired' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = { protect };