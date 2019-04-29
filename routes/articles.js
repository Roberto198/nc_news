const articlesRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const {
	sendArticleById,
	sendAllArticles,
	sendArticlesComments,
	updateArticle,
	uploadArticle,
} = require('../controllers/articlesController');
const { uploadComment } = require('../controllers/commentsController');

articlesRouter
	.route('/:article_id/comments')
	.get(sendArticlesComments)
	.post(uploadComment)
	.all(methodNotAllowed);

articlesRouter
	.route('/:article_id')
	.patch(updateArticle)
	.get(sendArticleById)
	.all(methodNotAllowed);

articlesRouter
	.route('/')
	.post(uploadArticle)
	.get(sendAllArticles)
	.all(methodNotAllowed);

module.exports = articlesRouter;
