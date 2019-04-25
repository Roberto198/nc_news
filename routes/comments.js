const commentsRouter = require('express').Router();
const { removeComment, updateComment } = require('../controllers/commentsController');

commentsRouter
	.route('/:comment_id')
	.delete(removeComment)
	.patch(updateComment);

module.exports = commentsRouter;
