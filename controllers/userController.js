const User = require('../models/userModel');

exports.registerUser = (req, res) => {
  const { username, email,password } = req.body;

  // Create the user (store the plain text password)
  User.createUser(username, email, password,(result) => {
    //res.send('User registered successfully!');
    res.redirect('/login');
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  User.findByEmail(email, (existingUser) => {
    if (!existingUser) {
      return res.status(400).send('User not found');
    }

    // Check if the password matches (since you're not using bcrypt or Passport)
    if (existingUser.password !== password) {
      return res.status(400).send('Invalid password');
    }

      req.session.user = {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email
    };

    // If login is successful, redirect to the URL shortener page
    res.redirect('/shorten');  // Redirect to URL shortener after successful login
  });
};