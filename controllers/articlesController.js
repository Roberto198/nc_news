const {
	selectArticleById,
	selectAllArticles,
	selectArticlesComments,
	patchArticle,
} = require('../models/articlesModels');
const { selectAllTopics } = require('../models/topicsModels');
const { selectUsers } = require('../models/usersModels');

exports.sendAllArticles = (req, res, next) => {
	let query = req.query;
	let { topic, author } = req.query;
	const checkTopics = selectAllTopics(topic);
	const sendArticles = selectAllArticles(query);
	const checkAuthors = selectUsers(author);

	Promise.all([checkTopics, checkAuthors, sendArticles])
		.then(([topic, author, article]) => {
			console.log(topic, '<-topic');
			console.log(author, '<-author');
			if (topic.length === 0) {
				return Promise.reject({ status: 404, msg: 'No such topic found' });
			}
			if (author.length === 0) {
				return Promise.reject({ status: 404, msg: 'No such author found' });
			} else {
				res.status(200).send({ articles: article });
			}
		})
		.catch(err => {
			console.log(err);
			next(err);
		});
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
