const { selectAllSearch } = require('../models/searchModel');

exports.sendSearch = (req, res, next) => {
	const { search_term } = req.params;
	const { query } = req;
	selectAllSearch(search_term, query)
		.then(articles => {
			res.status(200).send({ articles });
		})
		.catch(err => {
			next(err);
		});
};
