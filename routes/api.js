const apiRouter = require('express').Router();
const { methodNotAllowed, routeNotFound, handle500 } = require('../errors');
const topicsRouter = require('./topics');
const articlesRouter = require('./articles');

apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter
	.route('/')
	.get((req, res) => res.send({ ok: true }))
	.all(methodNotAllowed);

apiRouter.all('/*', routeNotFound);

module.exports = apiRouter;
