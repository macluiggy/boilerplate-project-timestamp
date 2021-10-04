//const express = require('express');
// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()
var path = require('path')

const serverless = require('serverless-http');

//const app = express();
const router = express.Router();

router.get("/", (req, res) => {
	res.sendfile(path.resolve('./index.html'));
})
console.log(__dirname)


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/hola", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
}) ;

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//LA PARTE DE LOS PROJECTOS...... 
/*A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds*/

app.get("/api/:string_date", (req, res) => {
  let { string_date } = req.params;
  let date = new Date(string_date)
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  })
})

// listen for requests :)
/*var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});*/

app.use('/.netlify/functions/api', router)
module.exports = app;
module.exports.handler = serverless(app)