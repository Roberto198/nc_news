const { selectAllSearch } = require('../models/searchModel');

exports.sendSearch = (req, res, next) => {
	const { search_term } = req.params;
	const { query } = req;
	selectAllSearch(search_term, query)
		.then(articles => {
			console.log(articles);
			res.status(200).send({ articles, article_count: articles.length });
		})
		.catch(err => {
			next(err);
		});
};
