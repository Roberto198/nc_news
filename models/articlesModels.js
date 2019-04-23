const connection = require('../db/connection');

exports.selectAllArticles = () => {
	return connection
		.select(
			'articles.article_id',
			'articles.title',
			'articles.votes',
			'articles.topic',
			'articles.author',
			'articles.created_at'
		)
		.from('articles')
		.join('comments', 'articles.article_id', '=', 'comments.article_id')
		.count('comments.article_id as comment_count')
		.groupBy('articles.article_id');
};

exports.selectArticleById = id => {
	return connection('articles')
		.where('article_id', '=', id)
		.returning('*');
};
