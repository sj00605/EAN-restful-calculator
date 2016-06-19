// ROUTES FOR OUR API
// =============================================================================
var express = require('express');
var router = express.Router();              // get an instance of the express Router
var fs = require("fs");

/* var Operators = require('./models/operators');
Operators.methods(['get','post']);
Operators.register(router, '/operators'); */

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/operators', function(req, res, next) {
	var file = fs.readFileSync('./public/app/models/operators.json', 'utf8');
	var json = JSON.parse(file);
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(json));
	res.end();
	next();
});

router.post('/calculate/ADD', function(req, res, next) {
	
	//console.log("Request for addition of " + JSON.stringify(req));
	res.setHeader('Content-Type', 'application/json');
	var answer = (parseInt(req.body.a)+parseInt(req.body.b));
	res.send(answer.toString());
	next();
});

router.post('/calculate/SUB', function(req, res, next) {
	
	//console.log("Request for addition of " + JSON.stringify(req));
	res.setHeader('Content-Type', 'application/json');
	var answer = (parseInt(req.body.a)-parseInt(req.body.b));
	res.send(answer.toString());
	next();
});

router.post('/calculate/MUL', function(req, res, next) {
	
	//console.log("Request for addition of " + JSON.stringify(req));
	res.setHeader('Content-Type', 'application/json');
	var answer = (parseInt(req.body.a)*parseInt(req.body.b));
	res.send(answer.toString());
	next();
});

router.post('/calculate/DIV', function(req, res, next) {
	
	//console.log("Request for addition of " + JSON.stringify(req));
	res.setHeader('Content-Type', 'application/json');
	var answer = (parseInt(req.body.a)\parseInt(req.body.b));
	res.send(answer.toString());
	next();
});

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


// more routes for our API will happen here

module.exports = router;