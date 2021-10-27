// server.js
// where your node app starts
// init project
var express = require('express');
var app = express();
require('dotenv').config({ path: './.env' });
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public'));
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});
var responseObject = {};
app.get("/api/:date_string", function (req, res) {
    var date_string = req.params.date_string;
    date_string = +date_string || date_string;
    //console.log(date_string)
    var date = new Date(date_string);
    //console.log(date)
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
    if (date == 'Invalid Date') {
        return res.json({
            error: "" + date
        });
    }
    return res.json(responseObject);
});
app.get('/api', function (req, res) {
    var date = new Date();
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
    res.json(responseObject);
});
// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + process.env.PORT);
});
