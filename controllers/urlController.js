// controllers/urlController.js
const shortid = require('shortid');
const Url = require('../models/urlModel');

// middleware to check login
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login"); // not logged in
  }
  next();
}

exports.shortenUrl = (req, res) => {
  const { originalUrl } = req.body;
  const userId = req.session.user.id;
  console.log(userId);
  

  // Check if the original URL already exists
  Url.findByOriginalUrl(originalUrl,userId, (existingUrl) => {
    if (existingUrl) {
      // If it exists, increment the shorten count and return the short URL
      Url.incrementShortenCount(existingUrl.id, () => {
        res.render('index', { 
          shortUrl: `http://localhost:3000/${existingUrl.short_url}`, 
          shortenCount: existingUrl.shorten_count + 1 
        });
      });
    } else {
      // If it doesn't exist, create a new short URL
      const shortUrl = shortid.generate();
      Url.create(originalUrl, shortUrl,1,userId, (result) => {
        res.render('index', { 
          shortUrl: `http://localhost:3000/${shortUrl}`, 
          shortenCount: 1 
        });
      });
    }
  });
};


exports.redirectUrl = (req, res) => {
  const shortUrl = req.params.shortUrl; // Extract short URL
  console.log(`Looking up short URL: ${shortUrl}`); // Log the short URL

  // Find the original URL
  Url.findByShortUrl(shortUrl, (urlData) => {
    if (urlData) {
      console.log(`Found original URL: ${urlData.original_url}`); // Log original URL
      res.redirect(urlData.original_url); // Redirect
    } else {
      //console.log('URL not found'); // Log not found
      res.status(404).send('URL not found'); // Send response
    }
  });
};

// Logged-in user's own URLs
exports.getMyUrls = (req, res) => {
  const userId = req.session.user.id;

  Url.findUrlsByUserId(userId, (urls) => {
    res.render('userUrls', { urls });
  });
};

exports.getUserUrls = (req,res) => {
  const userId = req.params.userId;

  Url.findUrlsByUserId(userId,(urls) => {
    res.render('userUrls', { urls });
  });
};