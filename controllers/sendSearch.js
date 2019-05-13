const { selectAllSearch } = require('../models/searchModel');

exports.sendSearch = (req, res, next) => {
	const { search_term } = req.params;
	console.log(search_term);
	selectAllSearch(search_term)
		.then(articles => {
			res.status(200).send({ articles });
		})
		.catch(err => {
			next(err);
		});
};
