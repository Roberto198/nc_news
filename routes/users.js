const userRouter = require('express').Router();
const { sendUsers } = require('../controllers/usersController');

userRouter.get('/:username', sendUsers);

module.exports = userRouter;
