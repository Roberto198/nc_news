const commentsRouter = require('express').Router();
const { removeComment, uploadComment } = require('../controllers/commentsController');

commentsRouter.delete('/:comment_id', removeComment);

module.exports = commentsRouter;
