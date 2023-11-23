const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');

// Import controllers
const userController = require('../controllers/userController');

// Routes
router.get('/:id', authenticateToken, userController.getUserById);
router.get('/', userController.getUsers);
router.post('/create', authenticateToken, userController.createUser);
router.post('/register', userController.registerUser);
router.post('/signin', userController.signInUser);
router.delete('/:id', authenticateToken, userController.deleteUser);
router.put('/:id', authenticateToken, userController.updateUser);

module.exports = router;
