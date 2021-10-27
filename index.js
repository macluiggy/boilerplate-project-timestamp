// server.js
// where your node app starts
// init project
var express = require('express');
var app = express();
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

//LA PARTE DE LOS PROJECTOS...... 
/*A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the date_string date in milliseconds*/
let responseObject = {}
app.get("/api/:date_string", (req, res) => {
    let {date_string} = req.params;

    date_string = +date_string || date_string
    //console.log(date_string)
    let date = new Date(date_string)
    //console.log(date)
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();

    if (date == 'Invalid Date') {
        res.json({
            error: `${date}`
        })
    } else {
        res.json(responseObject)
    }

})

app.get('/api', (req, res) => {
    let date = new Date()
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
    res.json(responseObject);
})

app.get('/api/compa', (req, res) => {
    res.json({
        hola: 'como esta mi compa'
    })
})
// listen for requests :)

var listener = app.listen(3000, function () {
    console.log('Your app is listening on port 3000');
});
