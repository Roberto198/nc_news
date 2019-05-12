const {
	selectArticleById,
	selectAllArticles,
	selectArticlesComments,
	patchArticle,
	postArticle,
} = require('../models/articlesModels');
const { selectAllTopics, insertTopic } = require('../models/topicsModels');
const { selectUsers } = require('../models/usersModels');

exports.sendAllArticles = (req, res, next) => {
	const query = req.query;
	const { topic, author } = req.query;
	const checkTopics = selectAllTopics(topic);
	const checkAuthors = selectUsers(author);
	const sendArticles = selectAllArticles(query);

	const countObj = { ...req.query };
	countObj.limit = 999999;

	Promise.all([checkTopics, checkAuthors, sendArticles])
		.then(([topic, author, article]) => {
			if (topic.length === 0 && req.query.topic) {
				return Promise.reject({ status: 404, msg: 'No such topic found' });
			}
			if (author.length === 0 && req.query.author) {
				return Promise.reject({ status: 404, msg: 'No such author found' });
			} else {
				selectAllArticles(countObj).then(results => {
					res.status(200).send({ articles: article, article_count: results.length });
				});
			}
		})
		.catch(next);
};

exports.sendArticleById = (req, res, next) => {
	const { article_id } = req.params;
	selectArticleById(article_id)
		.then(([article]) => {
			if (!article) {
				return Promise.reject({ status: 404, msg: 'Article not found by this ID' });
			} else {
				res.status(200).send({ article });
			}
		})
		.catch(next);
};

exports.sendArticlesComments = (req, res, next) => {
	const { query } = req;
	const { article_id } = req.params;
	const checkArticles = selectArticleById(article_id);
	const getComments = selectArticlesComments(article_id, query);
	const countObj = { ...req.query };
	countObj.limit = 999999;

	Promise.all([checkArticles, getComments])
		.then(([article, comments]) => {
			if (article.length === 0) {
				return Promise.reject({ status: 404, msg: 'Article not found' });
			} else {
				selectArticlesComments(article_id, countObj).then(result =>
					res.status(200).send({ comments, comment_count: result.length })
				);
			}
		})
		.catch(next);
};

exports.updateArticle = (req, res, next) => {
	const { inc_votes } = req.body;
	const { article_id } = req.params;

	patchArticle(inc_votes, article_id)
		.then(([article]) => {
			if (!article) {
				return Promise.reject({ status: 404, msg: 'Article not found by this ID' });
			} else res.status(200).send({ article });
		})
		.catch(next);
};

exports.uploadArticle = (req, res, next) => {
	const { body } = req;
	const topicCheck = selectAllTopics(body.topic);

	Promise.all([topicCheck])
		.then(topic => {
			if (topic[0].length > 0) {
				postArticle(body).then(article => {
					res.status(201).send({ article: article[0] });
				});
			} else {
				insertTopic(body).then(topic => {
					{
						postArticle(body).then(article => {
							res.status(201).send({ article: article[0] });
						});
					}
				});
			}
		})

		.catch(err => {
			next(err);
		});
};
