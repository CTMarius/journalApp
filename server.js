var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/journalModel'), //created model loading here
  bodyParser = require('body-parser'),
  basicAuth = require('basic-auth');

// Mongoose instance connection URL connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/journalapi?retryWrites=true&w=majority');

app.use(express.static('front'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // Replace with the appropriate origin(s)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Middleware for Basic Authentication
const authenticate = (req, res, next) => {
  const credentials = basicAuth(req);

  // Check if credentials are valid
  if (
    !credentials ||
    !validateCredentials(credentials.name, credentials.pass)
  ) {
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
    username === 'admin' &&
    password === 'admin'
  );
};

// Middleware to apply Basic Authentication only to index.html
app.use((req, res, next) => {
  if (req.url === '/index.html') {
    return authenticate(req, res, next);
  }
  next();
});

// Register routes
var routes = require('./api/routes/journalRoutes'); // importing route
routes(app); // register the route

// Start the server
app.listen(port, 'localhost', () => {
  console.log(`API Server is running on port ${port}`);
});
