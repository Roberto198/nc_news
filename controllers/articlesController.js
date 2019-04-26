const {
	selectArticleById,
	selectAllArticles,
	selectArticlesComments,
	patchArticle,
} = require('../models/articlesModels');
const { selectAllTopics } = require('../models/topicsModels');
const { selectUsers } = require('../models/usersModels');

exports.sendAllArticles = (req, res, next) => {
	const query = req.query;
	const { topic, author } = req.query;
	const checkTopics = selectAllTopics(topic);
	const checkAuthors = selectUsers(author);
	const sendArticles = selectAllArticles(query);

	Promise.all([checkTopics, checkAuthors, sendArticles])
		.then(([topic, author, article]) => {
			if (topic.length === 0) {
				return Promise.reject({ status: 404, msg: 'No such topic found' });
			}
			if (author.length === 0) {
				return Promise.reject({ status: 404, msg: 'No such author found' });
			} else {
				res.status(200).send({ articles: article });
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

	Promise.all([checkArticles, getComments])
		.then(([article, comments]) => {
			if (article.length === 0) {
				return Promise.reject({ status: 404, msg: 'Article not found' });
			} else {
				res.status(200).send({ comments });
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
