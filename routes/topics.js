const topicsRouter = require('express').Router();
const { methodNotAllowed, routeNotFound, handle500, missingId } = require('../errors');
const { sendAllTopics } = require('../controllers/topicsController');

topicsRouter.get('/', sendAllTopics);

module.exports = topicsRouter;
