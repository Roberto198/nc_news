# NCNews

A simple database api for retreiving news articles and comments. Written in javascript, using express, knex and psql, currently hosted on Heroku. This project is designed to provide data for a mobile web application built with reac.JS. Please read the documentation there for front-end information.

Front End repo: [GitHub.com/Roberto198/NCNewsFrontEnd](https:/GitHub.com/Roberto198/NCNewsFrontEnd),

Front End Hosted: [https://robs-news-app.netlify.com/](https://robs-news-app.netlify.com/)

Hosted API: [https://northcodersapinews.herokuapp.com/api](https://northcodersapinews.herokuapp.com/api)

## Getting Started

To adapt develop or test this project for this repository on github and clone to your loval machine.

### Prerequisites

The software runs on node, and depends on Express.js, PostgreSQL, and Knex. Type

### Installing

Clone the reop down to your local machine and use the following commands to install all dependancies:

```
npm -i
```

You can now run the API server. Type this command into your terminal and point your internet browser to the appropriate local host port shown in your terminal.

```
npm start
```

## Running the tests

The test suite runs on Mocha, Chai and superTest. Use the follwing command to start the suite:

```
npm test
```

Alternatively, you can start the server and use an automated API testing tool such as Postman or Insomnia to test individual endpoints including post/patch/delete requests.

## Built With

- [Node](https://nodejs.org/en/) - The JS runtime environment.
- [PGSQL](https://www.postgresql.org/) - Database facility.
- [knex.js](https://knexjs.org/) - SQL query builder for PostgreSQL.
- [Express.js](https://expressjs.com/) - Web framework.
- [Chai Assertion](https://www.chaijs.com) - Assertion Library for testing.
- [SuperTest](https://www.npmjs.com/package/supertest) - For testing https requests.

## Authors

- **Robert Clegg** - Architect - [Roberto198](https://github.com/Roberto198)
- **Northcoders** - Development SQL Data - http://www.northcoders.com
