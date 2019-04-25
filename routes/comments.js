const commentsRouter = require('express').Router();
const { removeComment, updateComment } = require('../controllers/commentsController');
const { methodNotAllowed } = require('../errors/index');

commentsRouter
	.route('/:comment_id')
	.delete(removeComment)
	.patch(updateComment)
	.all(methodNotAllowed);

module.exports = commentsRouter;
