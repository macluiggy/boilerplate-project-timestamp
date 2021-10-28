// server.js
// where your node app starts
// init project
var express = require('express');
var app = express();
require('dotenv').config({path: './.env'})

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/assets'));

// http://expressjs.com/en/starter/basic-routing.html...
interface SendFileResponse {
    sendFile: (value: string) => void;
}
app.get("/", function (req: any, res: SendFileResponse) {
    res.sendFile(__dirname + '/views/index.html');
});

interface ApiHelloResponse {
    json: ({greeting}: {greeting: string}) => void;
}
// your first API endpoint
app.get("/api/hello", function (req: any, res: ApiHelloResponse) {
    res.json({greeting: 'hello API'});
});

//LA PARTE DE LOS PROJECTOS......
/*A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the date_string date in milliseconds*/
interface ErrorResponse {
    error: string
}
interface ResponseObject {
    unix: number,
    utc: string
}
type ApiDateStringResponseJsonArg = ResponseObject | ErrorResponse;
interface ApiDateStringResponse {
    json: (jsonObject: ApiDateStringResponseJsonArg) => void;
}
interface ApiDateStringRequest {
    params: {date_string: number};
}
let responseObject = {unix: 0, utc: ''}
app.get("/api/:date_string", (req: ApiDateStringRequest, res: ApiDateStringResponse) => {
    let {date_string} = req.params;

    date_string = +date_string || date_string
    //console.log(date_string)
    let date = new Date(date_string)
    //console.log(date)
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();

    /*
if (date == 'Invalid Date') {
        return res.json({
            error: `${date}`
        })
    }
     */

    return res.json(responseObject)
})

type ApiRequest = {

}
interface ApiResponse {
    json: (val: any) => void
}
app.get('/api', (req: ApiRequest, res: ApiResponse) => {
    let date = new Date()
    responseObject['unix'] = date.getTime();
    responseObject['utc'] = date.toUTCString();
    res.json(responseObject);
})
// listen for requests :)
let port = process.env.PORT || 3000
var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + process.env.PORT);
});
