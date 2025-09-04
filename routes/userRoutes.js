const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const auth = require('../auth');

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

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Logout failed");
    }
    res.redirect('/login'); // after logout go to login page
  });
});

module.exports = router;
