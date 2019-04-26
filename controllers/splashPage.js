//PAGE STILL UNDER EDIT

exports.splashPage = (req, res, next) => {
	res.status(200).send({
		'welcomt to the NC News API': 'Please use the following routes and queries:',
		Topics: { 'to see available topics': 'use /api/topics' },
		Articles: {
			'To see all articles': 'use /api/articles',
			'To see a specific article use its ID': 'use /api/articles/1',
			'To filter or sort the articles us queries:': {
				'Filter by author:': '?author=',
				'To filter by topic': '?topic=',
				'to sort by a column:': '?sort_by=',
				'To change order from descending': '?order=asc',
			},
			'To see the comments for an article:': 'use api/articles/:article_id/comments',
			'To increment the vote on an article':
				'Send patch request to api/articles/:article_id containing inc_votes key in the body',
		},
		Comments: {
			'To post a comment':
				'send a post request to /api/articles/:article_id/comments, containing keys of user and body',
			'To increment the vote on a comment':
				'send a patch request to api/comments/:comment_id, containing inc_votes key in the body ',
			'To delete a comment': 'send a delete request to api/comments/comment_id',
			'To filter and/or sort comments': {
				'Filter by author:': '?author=',
				'to sort by a column:': '?sort_by=',
				'To change order from descending': '?order=asc',
			},
		},
		Users: {
			'To see all users': 'use api/users',
			'To see an indevidual user': 'use api/users/:user_id',
		},
	});
};
