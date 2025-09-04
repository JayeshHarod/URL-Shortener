// routes/urlRoutes.js
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

const auth = require('../auth');

// Route to shorten a URL
router.post('/shorten',auth,urlController.shortenUrl);

router.get('/shorten', auth,(req, res) => {
  res.render('index');  // Render the index.ejs page (URL shortener form)
});


// Route to handle redirection for short URLs
router.get('/:shortUrl', urlController.redirectUrl);

router.get('/my/urls', auth, urlController.getMyUrls);

router.get('/user/:userId/urls', auth, urlController.getUserUrls);

module.exports = router;
