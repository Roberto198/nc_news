//PAGE STILL UNDER EDIT

exports.splashPage = (req, res, next) => {
	res.status(200).send({
		'welcomt to the NC News API': 'Please use the folling woutes and queries:',
		Topics: { 'to see available topics': 'use /api/topics' },
		Articles: {
			'To see all articles': 'use /api/articles',
			'To see a specific article use its ID': 'use /api/articles/1',
		},
	});
};
