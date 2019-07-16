[![Build Status](https://travis-ci.com/Wokoro/way_farer_test.svg?branch=develop)](https://travis-ci.com/Wokoro/way_farer_test)
[![Maintainability](https://api.codeclimate.com/v1/badges/238553b25e94ef730b2e/maintainability)](https://codeclimate.com/github/Wokoro/way_farer_test/maintainability)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5e0e7fbf880f4945b71bd0e6ee42aa68)](https://www.codacy.com/app/Wokoro/way_farer_test?utm_source=github.com&utm_medium=referral&utm_content=Wokoro/way_farer_test&utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/Wokoro/way_farer_test/badge.svg?branch=develop)](https://coveralls.io/github/Wokoro/way_farer_test?branch=ft-user-signup-166986542)
[![Test Coverage](https://api.codeclimate.com/v1/badges/238553b25e94ef730b2e/test_coverage)](https://codeclimate.com/github/Wokoro/way_farer_test/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/Wokoro/way_farer_test/develop/badge.svg)](https://snyk.io/test/github/Wokoro/way_farer_test/develop)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# WayFarer

WayFarer is a public bus transportation booking API that is meant to power front-end applications. It helps users and admin to easily carry out activities involved in booking and managing a trip.

WayFarer provides users a handful of other functionalities, which includes options to select a prefered sit when booking a trip, ability for users to delete their previously booked trips and get a view of all currently booked trips, which can be filtered by origin or destination.

## Requirements

WayFarer is built with Node.js which is a backend technology and [Express](https://expressjs.com) server which is a framework that enables creating Node.js applications easier.

WayFarer requires the installation of [Node.js](http://nodejs.org) and [npm](https://www.npmjs.com/) (Node Package Manager). The backend is written in ES2015 so [Babel](https://babeljs.io/) is needed to compile it.

## Installation

-   Clone or download this repository

-   Install dependencies

-   Start the server

```bash
git clone git@github.com/Wokoro/way_farer
npm install
npm start
```

## Usage

WayFarer is hosted on Heroku [here](https://api-way-farer.herokuapp.com/api/v1/swaggerdocs/). Click on the link to access WayFarer easily.

You can also use Postman to make requests. A sample of [Postman requests](https://web.postman.co/collections/8118230-5ff4eab3-4247-4815-bcbd-48ebf18b5365?version=latest&workspace=6f15fe7e-edc1-4462-837b-07a4805b6556) is published online as well. You can take a look at it to see examples of requests made to WayFarer and the responses gotten.

To use the API, make requests to the endpoints supported by WayFarer and get your responses as JSON objects ready to use in the frontend.

## Features

### Required Features

1.  User can sign up.

2.  User can sign in.

3.  Admin can create a trip.

4.  Admin can cancel a trip.

5.  Both Admin and Users can see all trips.

6.  Users can book a seat on a trip.

7.  View all bookings. An Admin can see all bookings, while user can see all of his/her
    bookings.

8.  Users can delete their booking.

### Optional Features

1.  Users can get a list of filtered trips based on origin.

2.  Users can get a list of filtered trips based on destination.

3.  Users can specify their seat numbers when making a booking.

## Endpoints

    BasePath: https://way_farer-api.heroku.com or http//:localhost:3000

| Request Type | Function                                                                                      | Access Level                               | Enpoint                     | Postman Collection |
| ------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------- | ------------------ |
| POST         | Sign Up                                                                                       | User                                       | /api/v1/auth/signup         |                    |
| POST         | Sign In                                                                                       | User                                       | /api/v1/auth/signin         |                    |
| POST         | Create a trip                                                                                 | Admin                                      | /api/v1/trips               |                    |
| GET          | Get all trips                                                                                 | User                                       | /api/v1/trips               |                    |
| GET          | Get all trips based on destination or origin                                                  | User                                       | /api/v1/trips/?filter=""    |                    |
| PATCH        | Change sit after booking                                                                      | User(limited to his/her bookings)          | /api/v1/trips/:bookingId    |                    |
| POST         | Book a seat on a trip                                                                         | User                                       | /api/v1/bookings            |                    |
| GET          | View all bookings. An Admin can see all bookings, while user can see all of his/her bookings. | Admin and User(limited to his/her booking) | /api/v1/bookings            |                    |
| DELETE       | Delete a booking.                                                                             | User                                       | /api/v1/bookings/:bookingId |                    |
| PATCH        | Cancel a trip                                                                                 | Admin                                      | /api/v1//trips/:tripId      |                    |

Sample sign up request:

```JSON
{
    "first_name": "James" ,
    "last_name": "Softman" ,
    "sex": "male",
    "email": "testmail@yahoo.com" ,
    "phone_number": "09077484759",
    "address": "No. 38 Awela street yenegoa Bayelsa state",
    "password": "secret" ,
    "comfirm_password": "secret" ,
    "is_admin": true
}
```

Sample response

```JSON
{
    "status" : "success" ,
    "status_code" : 200,
    "data" : {
        "user_id" : 1,
        "is_admin": true,
        "phone_number": "09077484759",
        "address": "No. 38 Awela street yenegoa Bayelsa state",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzA4LCJpYXQiOjE1NTUxMDQzODQsImV4cCI6MTU1NTEwNzk4NH0.FCLELkNiNK8aqtIFLSGzRo1GUzLRfjpwM2NNl3Su2ow"
    }
}
```

Sample sign In request:

```JSON
{
  "email": "testmail@yahoo.com",
  "password": "secret"
}
```

Sample response

```JSON
{
    "status" : "success" ,
    "status_code" : 200 ,
    "data" : {
        "user_id" : 1 ,
        "is_admin" : true ,
        "phone_number": "09077484759",
        "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzA4LCJpYXQiOjE1NTUxMDQzODQsImV4cCI6MTU1NTEwNzk4NH0.FCLELkNiNK8aqtIFLSGzRo1GUzLRfjpwM2NNl3Su2ow"
    }
}
```

## Documentation

Documentation for this app is available at: [API docs](https://way_farer_api.herokuapp.com/api-docs)

You can also find the Postman [collection](https://documenter.getpostman.com/view/5824922/S1ENyyag#intro) to see more examples.

## Tests

```Bash
npm test
```

## License

WayFarer is available under the MIT license. Visit [LICENSE](https://github.com/Wokoro/way_farer/blob/master/LICENSE.md) for more details.
