const connection = require('../db/connection');

exports.deleteComment = id => {
	console.log(id);
	return connection.select('*').from * 'comments'.returning('*');
};
