const { selectUsers } = require('../models/usersModels');

exports.sendUsers = (req, res, next) => {
	let { username } = req.params;

	selectUsers(username)
		.then(user => {
			if (user.length === 0) res.status(404).send({ msg: 'User not found' });
			res.status(200).send(user[0]);
		})
		.catch(next);
};
