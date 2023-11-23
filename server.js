const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');
const fs = require("fs");

// Mongoose instance connection URL connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/journalapi?retryWrites=true&w=majority');

// Importing route
const routes = require('./api/routes/journalRoutes');
routes(app); // Register the route

// Middleware for CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for Basic Authentication
const authenticate = (req, res, next) => {
  const credentials = basicAuth(req);

  // Check if credentials are valid
  if (!credentials || !validateCredentials(credentials.name, credentials.pass)) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Authentication Required"');
    return res.status(401).send('Unauthorized');
  }

  // Valid credentials, proceed to the next middleware
  next();
};

// Function to validate credentials (replace this with your own logic)
const validateCredentials = (username, password) => {
  // Replace this with your authentication logic
  return username === 'admin' && password === 'admin';
};

// Apply Basic Authentication Middleware to journal routes
app.use('/api/journal', authenticate);

// Start the server
app.listen(port, () => {
  console.log(`API Server is running on port ${port}`);
});
