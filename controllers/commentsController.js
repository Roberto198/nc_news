const { deleteComment } = require('../models/commentsModels');

exports.removeComment = (req, res, next) => {
	let { comment_id } = req.params;
	deleteComment(comment_id)
		.then(() => {
			res.status(204).send();
		})
		.catch(next);
};
