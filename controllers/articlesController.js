const { selectArticleById, selectAllArticles } = require('../models/articlesModels');

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
