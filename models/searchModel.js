const connection = require('../db/connection');

exports.selectAllSearch = (searchTerm, query) => {
	let { sort_by, order } = query;

	let basicQuery = connection
		.select(
			'articles.article_id',
			'articles.title',
			'articles.votes',
			'articles.topic',
			'articles.body',
			'articles.author',
			'articles.created_at'
		)
		.where('articles.body', 'like', `%${searchTerm}%` || '%')
		.orWhere('articles.title', 'like', `%${searchTerm}%` || '%')
		.orWhere('articles.title', 'like', `%${searchTerm}%` || '%')
		.from('articles')
		.join('comments', 'articles.article_id', '=', 'comments.article_id')
		.count('comments.article_id as comment_count')
		.groupBy('articles.article_id');

	if (query.sort_by) {
		basicQuery.orderBy(sort_by || 'created_at', order || 'desc');
	}

	return basicQuery;
};
