const connection = require('../db/connection');

exports.selectUsers = username => {
	return connection('users')
		.select('*')
		.where('username', 'like', username || '%');
};
