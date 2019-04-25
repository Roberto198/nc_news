const connection = require('../db/connection');

exports.selectAllTopics = topic => {
	return connection
		.select('*')
		.from('topics')
		.where('slug', 'like', topic || '%');
};
