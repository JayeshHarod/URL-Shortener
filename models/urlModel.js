// models/urlModel.js
const db = require('../config');

const Url = {
  create: (originalUrl, shortUrl,shortenCount, userId, callback) => {
    const query = 'INSERT INTO urls (original_url, short_url, shorten_count,user_id) VALUES (?, ?, 1,?)';
    db.query(query, [originalUrl, shortUrl,shortenCount,userId], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  },

  findByOriginalUrl: (originalUrl, userId, callback) => {
    const query = 'SELECT * FROM urls WHERE original_url = ? and user_id = ?';
    db.query(query, [originalUrl,userId], (err, result) => {
      if (err) throw err;
      callback(result[0]);
    });
  },

  findByShortUrl: (shortUrl, callback) => {
    const query = 'SELECT * FROM urls WHERE short_url = ?';
    db.query(query, [shortUrl], (err, result) => {
      if (err) throw err;
      callback(result[0]);
    });
  },

  incrementShortenCount: (id, callback) => {
    const query = 'UPDATE urls SET shorten_count = shorten_count + 1 WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  },

  findUrlsByUserId: (userId, callback) => {
  const query = 'SELECT * FROM urls WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) throw err;
    callback(results);  // Return the results as an array of URL objects
  });
}
};

module.exports = Url;
