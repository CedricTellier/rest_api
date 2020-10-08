
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Employee = require('./src/api/models/models'), //created model loading here
  bodyParser = require('body-parser');
  
var cors = require('cors')
//mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://caddev_user:o2kkHvBPppkyeW5z@caddev.w8pl8.mongodb.net/test', { useNewUrlParser: true }); 

app.use(cors());
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
var routes = require('./src/api/routes/routes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);

console.log('Caddev Rest Full API Start: ' + port);