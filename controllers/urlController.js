// controllers/urlController.js
const shortid = require('shortid');
const Url = require('../models/urlModel');


exports.shortenUrl = (req, res) => {
  const { originalUrl } = req.body;
  const userId = req.body.userId;

  // Check if the original URL already exists
  Url.findByOriginalUrl(originalUrl, (existingUrl) => {
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
      console.log('URL not found'); // Log not found
      res.status(404).send('URL not found'); // Send response
    }
  });
};

exports.getUserUrls = (req,res) => {
  const userId = req.params.userId;

  Url.findUrlsByUserId(userId,(urls) => {
    res.render('userUrls', { urls });
    //res.redirect(urlData.original_url)
  });
};


/*
exports.shortenUrl = (req, res) => {
  const { originalUrl } = req.body; // Make sure userId is included
  userId = req.body.userId;
  console.log(userId);
  

  // Check if the original URL already exists for this user
  Url.findByOriginalUrlAndUserId(originalUrl, userId, (existingUrl) => {
    if (existingUrl) {
      // If it exists, increment the shorten count and return the short URL
      Url.incrementShortenCount(existingUrl.id, () => {
        res.render('index', { 
          shortUrl: `http://localhost:3000/${existingUrl.short_url}`, 
          shortenCount: existingUrl.shorten_count + 1 
        });
      });
    } else {
      // If it doesn't exist, create a new short URL for this user
      const shortUrl = shortid.generate();
      Url.create(originalUrl, shortUrl, userId, (result) => {
        res.render('index', { 
          shortUrl: `http://localhost:3000/${shortUrl}`, 
          shortenCount: 1 
        });
      });
    }
  });
};
*/