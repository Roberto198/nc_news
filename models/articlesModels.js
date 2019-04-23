const connection = require('../db/connection');

exports.selectAllArticles = ({ author, topic, sort_by, order }) => {
	return connection
		.select(
			'articles.article_id',
			'articles.title',
			'articles.votes',
			'articles.topic',
			'articles.author',
			'articles.created_at'
		)
		.where('articles.author', 'like', author || '%')
		.where('articles.topic', 'like', topic || '%')
		.from('articles')
		.join('comments', 'articles.article_id', '=', 'comments.article_id')
		.count('comments.article_id as comment_count')
		.groupBy('articles.article_id')
		.orderBy(sort_by || 'created_at', order || 'desc')
		.catch(err => console.log(err));
};

exports.selectArticleById = id => {
	return connection('articles')
		.where('article_id', '=', id)
		.returning('*');
};
