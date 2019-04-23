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
			res.status(200).send(article);
		})
		.catch(next);
};

exports.sendArticlesComments = (req, res, next) => {
	let { query } = req;
	let { article_id } = req.params;
	selectArticlesComments(article_id, query)
		.then(comments => {
			res.status(200).send(comments);
		})
		.catch(next);
};

exports.updateArticle = (req, res, next) => {
	patchArticle(req.body.inc_votes, req.params.article_id).then(article => {
		res.status(200).send({ updated_article: article });
	});
};
