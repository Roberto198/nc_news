const { selectAllTopics, insertTopic } = require('../models/topicsModels');

exports.sendAllTopics = (req, res, next) => {
	const { topic } = req.query;
	selectAllTopics(topic)
		.then(topics => {
			res.status(200).send({ topics, topics_count: topics.length });
		})
		.catch(next);
};

exports.uploadTopic = (req, res, next) => {
	let { body } = req;
	insertTopic(body)
		.then(topic => {
			res.status(201).send({ topic: topic[0] });
		})
		.catch(next);
};
