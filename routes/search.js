const searchRouter = require('express').Router();
const { sendSearch } = require('../controllers/sendSearch');
const { methodNotAllowed } = require('../errors');

searchRouter
	.route('/:search_term')
	.get(sendSearch)
	.all(methodNotAllowed);

module.exports = searchRouter;
