const db = require('../config');

// Function to create a user (store the plaintext password for now)
exports.createUser = (username, email,password, callback) => {
  const sql = 'INSERT INTO users (username, email,password) VALUES (?, ?, ?)';
  db.query(sql, [username, email,password], (err, result) => {
    if (err) throw err;
    callback(result);
  });
};

// Function to find a user by email
exports.findByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, result) => {
    if (err) throw err;
    callback(result[0]);
  });
};
