const articlesRouter = require('express').Router();
const { methodNotAllowed, routeNotFound, handle500 } = require('../errors');

articlesRouter.route('/').get((req, res) => {
	res.send({ msg: 'articles GET route' })
		.post(methodNotAllowed)
		.delete(methodNotAllowed)
		.patch(methodNotAllowed);
});

module.exports = articlesRouter;
