const { selectUsers } = require('../models/usersModels');

exports.sendUsers = (req, res, next) => {
	let { username } = req.params;
	selectUsers(username).then(users => {
		res.status(200).send(users);
	});
};
