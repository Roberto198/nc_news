const connection = require('../db/connection');
const { formatTopic } = require('../utils/utils');

exports.selectAllTopics = topic => {
	return connection
		.select('*')
		.from('topics')
		.where('slug', 'like', topic || '%');
};

exports.insertTopic = body => {
	let sqlBody = formatTopic(body);
	return connection('topics')
		.insert(sqlBody)
		.returning('*');
};
