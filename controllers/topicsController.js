const { selectAllTopics } = require('../models/topicsModels');

exports.sendAllTopics = (req, res, next) => {
	console.log('topic cont');
	selectAllTopics().then(topics => {
		res.status(200).send({ topics });
	});
};
