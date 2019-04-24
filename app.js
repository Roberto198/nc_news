const express = require('express');
const apiRouter = require('./routes/api');
const { routeNotFound, handle500, writtenErrors, sqlErrors } = require('./errors/index');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);
app.all('/*', routeNotFound);

app.use(writtenErrors);
app.use(sqlErrors);
app.use(handle500);

module.exports = app;
