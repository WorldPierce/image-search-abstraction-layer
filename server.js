// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var imageSearch = require('./models/imageSearch');
var connected=false;
var Bing = require('node-bing-api')({accKey: '34d1633a6ca84f00a5df2b6f9b1d2739'});


//connect to database mongoose pluralizes connections
var MONGODB_URI = 'mongodb://admin:admin@ds151662.mlab.com:51662/imagesearchdb';
//console.log(process.env.USER)
// mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
// });
mongoose.connect(MONGODB_URI);
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

app.get('/api/recentsearchs', (req,res)=>{
  imageSearch.find({},(err,data)=>{
    res.json(data);
  });
});

app.get('/api/imagesearch/:images*', (req, res)=>{
  var {images} = req.params;
  var {offset} = req.query;
  
  var data = new imageSearch({
    term: images,
    when: new Date()
  })
  //save to mongodb collection with mongoose
  data.save(err => {
    if(err) throw err
    //res.json(data);
  })
  // res.json({
  // images,
  // offset});
  // console.log(images);
  var searchOffSet;
  
  if(offset){
    if(offset == 1){
      offset = 0;
      searchOffSet = 1;
    }
    else if(offset > 1){
      searchOffSet = offset + 1;
    }
  }
  Bing.images(images,{
    top:(10 * searchOffSet),
    skip: (10 * offset)
  }, function(error, rez, body){
    var bingData = [];
    for(var i = 0; i < 10; i++){
      bingData.push({
        url: body.value[i].webSearchUrl,
        snippet: body.value[i].name,
        thumbnail: body.value[i].thumbnailUrl,
        context: body.value[i].hostPageDisplayUrl
      });
    }
    res.json(bingData);
  })
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
