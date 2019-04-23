const { selectAllTopics } = require('../models/topicsModels');

exports.sendAllTopics = (req, res, next) => {
	selectAllTopics()
		.then(topics => {
			res.status(200).send({ topics });
		})
		.catch(next);
};
