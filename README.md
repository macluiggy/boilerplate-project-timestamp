# Timestamp Microservice

This is my solution from [freeCodeCamp] [Back End Development and APIs Projects - Timestamp Microservice] project

## Requirements

- [x] A request to `/api/:date?` with a valid date should return a `JSON` object with a unix key that is a Unix timestamp of the input date in milliseconds

- [x] A request to `/api/:date?` with a valid date should return a `JSON` object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT

- [x] A request to `/api/1451001600000` should return `{ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }`

- [x] Your project can handle dates that can be successfully parsed by `new Date(date_string)`

- [x] If the input date string is invalid, the api returns an object having the structure `{ error : "Invalid Date" }`

- [x] An empty date parameter should return the current time in a `JSON` object with a unix key

- [x] An empty date parameter should return the current time in a `JSON` object with a utc key

## Installation

### Install dependencies
```bash
$ npm install
```

### Start the server
```bash
$ npm run dev
```

[Back End Development and APIs Projects - Timestamp Microservice]: https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/timestamp-microservice
[freeCodeCamp]: https://www.freecodecamp.org/
