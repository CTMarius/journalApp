const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Mongoose instance connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://mockUser:mockPassword@mockDatabase.ihnxr.mongodb.net/mockCollection?retryWrites=true&w=majority');

// Enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Parse incoming requests with JSON and URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import and register routes
const journalRoutes = require('./api/routes/journalRoutes');
journalRoutes(app);

// Start the server
app.listen(port, () => {
  console.log('Journal RESTful API server started on port: ' + port);
});

