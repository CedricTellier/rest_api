
require('dotenv').config();
var cors = require('cors');
var multer = require('multer');
var upload = multer();
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Employee = require('./src/api/models/models'), //created model loading here
  bodyParser = require('body-parser');

var database;
if(process.env.NODE_ENV == 'test')
{
  database = process.env.MONGODB_TEST_URI;
}
else
{
  database = process.env.MONGODB_PROD_URI;
}
//mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(`${database}`, { useNewUrlParser: true }); 

app.use(cors());
app.options('*', cors())
app.use('/favicon.ico', express.static('public/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.array()); 
app.use(express.static('public'));
var routes = require('./src/api/routes/routes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);

console.log('Caddev Rest Full API Start: ' + port);

module.exports = app;
module.export = mongoose;