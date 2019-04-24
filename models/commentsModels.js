const connection = require('../db/connection');
const formatComment = require('../utils/utils');

exports.deleteComment = id => {
	return connection('comments')
		.where('comment_id', id)
		.delete()
		.then(result => {
			return result;
		});
};

exports.postComment = comment => {
	let sqlComment = formatComment(comment, article);
	return connection('comments')
		.insert(sqlComment)
		.returning('*');
};
