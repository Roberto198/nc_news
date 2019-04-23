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
		.orderBy(sort_by || 'created_at', order || 'desc');
};

exports.selectArticleById = id => {
	return connection
		.select(
			'articles.article_id',
			'articles.title',
			'articles.votes',
			'articles.topic',
			'articles.author',
			'articles.created_at'
		)
		.where('articles.article_id', '=', id)
		.from('articles')
		.join('comments', 'articles.article_id', '=', 'comments.article_id')
		.count('comments.article_id as comment_count')
		.groupBy('articles.article_id');
};

exports.selectArticlesComments = (id, query) => {
	return connection('comments')
		.select('comment_id', 'votes', 'created_at', 'author', 'body')
		.where('comments.article_id', '=', id)
		.orderBy(query.sort_by || 'created_at', query.order || 'desc')
		.catch(err => console.log(err));
};

exports.patchArticle = (vote, id) => {
	console.log(vote);
	return connection
		.select(
			'articles.article_id',
			'articles.title',
			'articles.votes',
			'articles.topic',
			'articles.author',
			'articles.created_at'
		)
		.where('articles.article_id', '=', id)
		.from('articles')
		.join('comments', 'articles.article_id', '=', 'comments.article_id')
		.count('comments.article_id as comment_count')
		.groupBy('articles.article_id')
		.increment('votes', vote || 0)
		.returning('*')
		.catch(err => console.log(err));
};
