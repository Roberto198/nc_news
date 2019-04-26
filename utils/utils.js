exports.createUserRef = (array, key, value) => {
	return array.reduce((refObj, element) => {
		refObj[element[key]] = element[value];
		return refObj;
	}, {});
};

exports.formatArticleData = data => {
	return data.map(obj => {
		newObj = { ...obj };
		newObj['created_at'] = new Date(obj['created_at']);
		return newObj;
	});
};

exports.commentRef = (insertedArts, comm) => {
	return comm.reduce((refObj, comm) => {
		refObj[comm.belongs_to] = insertedArts.filter(article => {
			return article.title === comm.belongs_to;
		})[0].article_id;
		return refObj;
	}, {});
};

exports.formatCommentsData = (comments, ref) => {
	return comments.reduce((newArray, comment) => {
		let obj = {
			body: comment.body,
			author: comment.created_by,
			article_id: ref[comment['belongs_to']],
			created_at: new Date(comment['created_at']),
			votes: comment.votes,
		};

		newArray.push(obj);
		return newArray;
	}, []);
};

exports.formatComment = (comment, params) => {
	return {
		author: comment.username,
		article_id: params.article_id,
		body: comment.body,
	};
};
