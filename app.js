//================================================================
//                        SETUP
//================================================================


var express =  require('express');  //create variable looks in node folder to for express
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// Our routes
var owners = require('./routes/owners');
var pets = require('./routes/pets');

app.use(bodyParser.urlencoded({ extended: true }));   //Must come after route variables
app.use('/owners', owners);
app.use('/pets', pets);

//================================================================
//                  ROUTE CONNECTION & USE
//================================================================



//================================================================
//                    STATIC STUFF
//================================================================
// Catchall route
app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port')); //actively listening for requests
});
