const { deleteComment, postComment } = require('../models/commentsModels');

exports.removeComment = (req, res, next) => {
	let { comment_id } = req.params;
	deleteComment(comment_id)
		.then(result => {
			if (result === 1) res.status(204).send();
			else if (result === 0) res.status(404).send();
		})
		.catch(next);
};

exports.uploadComment = (req, res, next) => {
	console.log(req.params);
	postComment(req.body)
		.then(comment => {
			console.log(comment, '<-comment');
		})
		.catch(err => {
			console.log(err, '-<-err');
		});
};
