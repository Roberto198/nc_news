const connection = require('../db/connection');
const { formatComment } = require('../utils/utils');

exports.deleteComment = id => {
	return connection('comments')
		.where('comment_id', id)
		.delete()
		.then(result => {
			return result;
		});
};

exports.postComment = (body, params) => {
	const sqlComment = formatComment(body, params);
	return connection('comments')
		.insert(sqlComment)
		.returning('*');
};

exports.patchComment = (vote, id) => {
	if (!vote) return Promise.reject({ status: 400, msg: 'Incorrect request. No vote found.' });
	else
		return connection
			.select('*')
			.where('comments.comment_id', '=', id)
			.from('comments')
			.increment('votes', vote || 0)
			.returning('*');
};
