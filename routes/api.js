const apiRouter = require('express').Router();
const { methodNotAllowed, routeNotFound, handle500 } = require('../errors');

const topicsRouter = require('./topics');
const articlesRouter = require('./articles');
const usersRouter = require('./users');
const commentsRouter = require('./comments');
const searchRouter = require('./search');

const { splashPage } = require('../controllers/splashPage');

apiRouter.use('/articles', articlesRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/search', searchRouter);
apiRouter
	.route('/')
	.get(splashPage)
	.all(methodNotAllowed);

apiRouter.all('/*', routeNotFound);

module.exports = apiRouter;
