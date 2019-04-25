const {
	selectArticleById,
	selectAllArticles,
	selectArticlesComments,
	patchArticle,
} = require('../models/articlesModels');

exports.sendAllArticles = (req, res, next) => {
	let query = req.query;
	selectAllArticles(query)
		.then(articles => {
			res.status(200).send({ articles });
		})
		.catch(next);
};

exports.sendArticleById = (req, res, next) => {
	let { article_id } = req.params;
	selectArticleById(article_id)
		.then(([article]) => {
			if (!article) {
				return Promise.reject({ status: 404, msg: 'Article not found by this ID' });
			} else res.status(200).send(article);
		})
		.catch(err => {
			next(err);
		});
};

exports.sendArticlesComments = (req, res, next) => {
	let { query } = req;
	let { article_id } = req.params;
	selectArticlesComments(article_id, query)
		.then(comments => {
			if (!comments) {
				return Promise.reject({ status: 400, msg: 'Invalid article ID' });
			} else res.status(200).send({ comments });
		})
		.catch(next);
};

exports.updateArticle = (req, res, next) => {
	patchArticle(req.body.inc_votes, req.params.article_id)
		.then(([article]) => {
			if (!article) {
				return Promise.reject({ status: 404, msg: 'Article not found by this ID' });
			} else res.status(201).send({ updated_article: article });
		})
		.catch(err => {
			next(err);
		});
};
