const { selectAllTopics } = require('../models/topicsModels');

exports.sendAllTopics = (req, res, next) => {
	let { topic } = req.query;
	selectAllTopics(topic)
		.then(topics => {
			res.status(200).send({ topics });
		})
		.catch(next);
};
