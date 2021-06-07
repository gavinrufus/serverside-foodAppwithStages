const express = require('express'); // Importing package
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
require('dotenv').config() // Requiring environment file

const app = express(); // Initializing express
const port = process.env.FRONTEND_PORT || 3000; // Getting port

const jwtSecret = process.env.JWT_SECRET || '6cc71a24-5823-4cfa-ae6d-7f2da3a0043e'

app.use(express.static("public"));
app.use(cookieParser());

let authCheck = (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.cookies.jwt, jwtSecret);
    next();
  } catch {
    res.redirect('/sign-in');
  }
}

app.get('/', (req, res) => res.redirect('/home'));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, './public/foodapp_frontend/html/home.html')));
app.get('/about-us', (req, res) => res.sendFile(path.join(__dirname, './public/foodapp_frontend/html/about-us.html')));
app.get('/all-items', authCheck, (req, res) => res.sendFile(path.join(__dirname, './public/foodapp_frontend/html/all-items.html')));
app.get('/cold-drinks', authCheck, (req, res) => res.sendFile(path.join(__dirname, './public/foodapp_frontend/html/cold-drinks.html')));
app.get('/hot-drinks', authCheck, (req, res) => res.sendFile(path.join(__dirname, './public/foodapp_frontend/html/hot-drinks.html')));
app.get('/quick-bites', authCheck, (req, res) => res.sendFile(path.join(__dirname, './public/foodapp_frontend/html/quick-bites.html')));
app.get('/cart', authCheck, (req, res) => res.sendFile(path.join(__dirname, './public/foodapp_frontend/html/cart.html')));
app.get('/sign-in', (req, res) => res.sendFile(path.join(__dirname, './public/foodapp_frontend/html/sign-in.html')));

// Starting express server
app.listen(port, () => console.log(`I am up and running in port ${port}`));
