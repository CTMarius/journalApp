var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/journalModel'), //created model loading here
  bodyParser = require('body-parser');
   
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/journalapi?retryWrites=true&w=majority'); 

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // Replace with the appropriate origin(s)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/journalRoutes'); //importing route
routes(app); //register the route


https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  ).listen(port, 'localhost', () => {
  console.log(`API Server is running on port ${port}`);
});


console.log('todo list RESTful API server started on: ' + port);