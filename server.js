const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Task = require('./api/models/journalModel');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet'); // Added for enhanced security

// Use helmet middleware for security headers
app.use(helmet());

// Mongoose instance connection URL connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/journalapi?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if MongoDB connection fails
});

app.use(express.static('front'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // Replace with the appropriate origin(s)
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
  return (
    username === "admin" &&
    password === "admin"
    // username === process.env.BASIC_AUTH_USERNAME &&
    // password === process.env.BASIC_AUTH_PASSWORD
  );
};

// Apply Basic Authentication Middleware to journal routes
app.use('/api/journal', authenticate);

// Register routes after middleware
const routes = require('./api/routes/journalRoutes');
routes(app);

// Use HTTPS with proper certificates
const options = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem')
};

https.createServer(options, app).listen(port, 'localhost', () => {
  console.log(`API Server is running on port ${port}`);
});
