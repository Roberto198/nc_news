const commentsRouter = require('express').Router();
const { removeComment, updateComment, sendAllComments } = require('../controllers/commentsController');
const { methodNotAllowed } = require('../errors/index');

commentsRouter
	.route('/:comment_id')
	.delete(removeComment)
	.patch(updateComment)
	.all(methodNotAllowed);

commentsRouter.route('/').get(sendAllComments);

module.exports = commentsRouter;
