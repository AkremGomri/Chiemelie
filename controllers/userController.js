const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
exports.signInUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, 'my-secret-key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Example user controller
exports.createUser = async (req, res) => {
  const { username, email } = req.body;
    console.log("req.auth", req.auth);
  try {
    const user = new User({ username, email });
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
    try {
        if(req.auth._id != req.params.id) return res.status(401).json({ message: 'Unauthorized' });
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    if(req.auth._id != req.params.id) return res.status(401).json({ message: 'Unauthorized' });

    const { username, email } = req.body;

    try {
        const user = await User.findById(req.params.id);
        user.username = username;
        user.email = email;
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    if(req.auth._id != req.params.id) return res.status(401).json({ message: 'Unauthorized' });
    
    try {
        console.log("req.auth: ",req.auth);
        const user = await User.findById(req.params.id);
        await user.remove();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};