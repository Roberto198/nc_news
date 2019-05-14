const connection = require('../db/connection');

exports.selectAllSearch = (searchTerm, query) => {
	let { sort_by, order } = query;
	console.log(searchTerm, 'searchTerm');
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
		.from('articles')
		.join('comments', 'articles.article_id', '=', 'comments.article_id')
		.count('comments.article_id as comment_count')
		.groupBy('articles.article_id');

	if (query.sort_by) {
		basicQuery.orderBy(sort_by || 'created_at', order || 'desc');
	}
	if (searchTerm)
		basicQuery
			.where('articles.body', 'ilike', `%${searchTerm}%` || '%')
			.orWhere('articles.title', 'ilike', `%${searchTerm}%` || '%')
			.orWhere('articles.title', 'ilike', `%${searchTerm}%` || '%')
			.orWhere('articles.author', 'ilike', `%${searchTerm}%` || '%');

	return basicQuery;
};
