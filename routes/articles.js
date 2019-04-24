const articlesRouter = require('express').Router();
const { methodNotAllowed, routeNotFound, handle500, missingId } = require('../errors');
const {
	sendArticleById,
	sendAllArticles,
	sendArticlesComments,
	updateArticle,
} = require('../controllers/articlesController');
const { uploadComment } = require('../controllers/commentsController');

articlesRouter
	.route('/:article_id/comments')
	.get(sendArticlesComments)
	.post(uploadComment);

articlesRouter.patch('/:article_id', updateArticle);
articlesRouter.get('/:article_id', sendArticleById);
articlesRouter.all('/', sendAllArticles);

module.exports = articlesRouter;
