// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

app.use(express.static(__dirname + '/public'));


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', require('./router'));//rename to api
//app.use('/', require('./index.html'));//make an index.js

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// ADD MODELS
//var operator  = require('./app/models/operators');