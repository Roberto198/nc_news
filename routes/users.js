const userRouter = require('express').Router();
const { sendUsers } = require('../controllers/usersController');
const { methodNotAllowed } = require('../errors/index');

userRouter
	.route('/:username')
	.get(sendUsers)
	.all(methodNotAllowed);

userRouter.route('/').get(sendUsers);

module.exports = userRouter;
