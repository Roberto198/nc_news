const articlesRouter = require('express').Router();
const { methodNotAllowed, routeNotFound, handle500, missingId } = require('../errors');
const { sendArticleById, sendAllArticles, sendArticlesComments } = require('../controllers/articlesController');

articlesRouter.get('/:article_id/comments', sendArticlesComments);
articlesRouter.get('/:article_id', sendArticleById);
articlesRouter.all('/', sendAllArticles);

module.exports = articlesRouter;
