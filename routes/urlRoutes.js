// routes/urlRoutes.js
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// Route to shorten a URL
router.post('/shorten',urlController.shortenUrl);

router.get('/shorten', (req, res) => {
  res.render('index');  // Render the index.ejs page (URL shortener form)
});


// Route to handle redirection for short URLs
router.get('/:shortUrl', urlController.redirectUrl);

router.get('/user/:userId/urls', urlController.getUserUrls);

module.exports = router;
