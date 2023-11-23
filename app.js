const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); // Import cors

// Middleware to parse JSON
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect('mongodb+srv://user1:FvhxhfYMmmhVBQ4C@cluster0.9d5ri.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check for MongoDB connection success
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Models
// const userModel = require('./models/userModel');

app.use((req, res, next) => {
  console.log('new request made:');
  next();
});
// Routes
const userRoutes = require('./routes/userRouter');
app.use('/api/users', userRoutes);

module.exports = app;
