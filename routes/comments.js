const commentsRouter = require('express').Router();
const { removeComment } = require('../controllers/commentsController');

commentsRouter.delete('/:comment_id', removeComment);

module.exports = commentsRouter;
