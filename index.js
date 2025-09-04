const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');


const urlRoutes = require('./routes/urlRoutes');
const userRoutes = require('./routes/userRoutes');

const auth = require('./auth')

const app = express();

// Set up the view engine
app.set('view engine', 'ejs');

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));

// Session
app.use(session({
  secret:'@123$abc',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


// Serve static files (CSS, JS, images) from the 'public' folder
app.use(express.static('public'));

// Use the user and URL routes
app.use(userRoutes);
app.use(urlRoutes);

// Render the home page
app.get('/',auth, (req, res) => {
  res.render('index');
});
app.get('/register',(req,res) => {
  res.render('register');
})
app.get('/login',(req,res) => {
  res.render('login');
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
