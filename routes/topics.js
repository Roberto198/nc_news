const topicsRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { sendAllTopics, uploadTopic } = require('../controllers/topicsController');

topicsRouter
	.route('/')
	.get(sendAllTopics)
	.post(uploadTopic)
	.all(methodNotAllowed);

module.exports = topicsRouter;
