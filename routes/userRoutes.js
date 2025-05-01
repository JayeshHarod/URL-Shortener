const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register route
router.post('/register', userController.registerUser);

router.get('/register', (req, res) => {
    //console.log('Register Route hit');
    res.render('register');  // Render the register.ejs page
  });
  

// Login route
router.post('/login', userController.loginUser);

router.get('/login', (req, res) => {
    //console.log('Login route hit');
    res.render('login');
  });

module.exports = router;
