const articlesRouter = require('express').Router();
const { methodNotAllowed, routeNotFound, handle500, missingId } = require('../errors');
const {
	sendArticleById,
	sendAllArticles,
	sendArticlesComments,
	updateArticle,
} = require('../controllers/articlesController');

articlesRouter.get('/:article_id/comments', sendArticlesComments);
articlesRouter.patch('/:article_id', updateArticle);
articlesRouter.get('/:article_id', sendArticleById);
articlesRouter.all('/', sendAllArticles);

module.exports = articlesRouter;
