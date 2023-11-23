const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing Token' });
  }

  jwt.verify(token, 'my-secret-key', async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid Token' });
    }

    req.auth = await User.findById(user.userId);
    next();
  });
};

module.exports = { authenticateToken };