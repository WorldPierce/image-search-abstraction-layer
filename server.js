// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var shortUrl = require('./models/imageSearch');
var connected=false;


//connect to database mongoose pluralizes connections
var MONGODB_URI = 'mongodb://admin:admin@ds151702.mlab.com:51702/shorturldb';
//console.log(process.env.USER)
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

app.use(cors());
app.use(bodyParser.json());
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/imagesearch/:images(*)', (req, res)=>{
  var {images} = req.params;
  res.send(images);
  console.log(images);
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
