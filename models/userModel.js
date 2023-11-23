const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;