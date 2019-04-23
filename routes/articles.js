const articlesRouter = require('express').Router();
const { methodNotAllowed, routeNotFound, handle500, missingId } = require('../errors');
const { sendArticleById, sendAllArticles } = require('../controllers/articlesController');

articlesRouter.get('/:article_id', sendArticleById);
articlesRouter.all('/', sendAllArticles);

module.exports = articlesRouter;
