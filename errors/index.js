exports.routeNotFound = (req, res) => {
	res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
	res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle500 = (err, req, res, next) => {
	res.status(500).send({ msg: 'Internal Server Error' });
};

exports.writtenErrors = (err, req, res, next) => {
	if (err.status === 404) {
		res.status(404).send(err);
	}
	if (err.status === 400) {
		res.status(400).send(err);
	} else next(err);
};

exports.sqlErrors = (err, req, res, next) => {
	if (err.code === '22P02') {
		res.status(400).send({ msg: 'Invalid ID type' });
	} else next(err);
};
