exports.createUserRef = (array, key, value) => {
	return array.reduce((refObj, element) => {
		refObj[element[key]] = element[value];
		return refObj;
	}, {});
};

const dateStamp = stamp => {
	let date = new Date(stamp);
	let year = date.getFullYear();
	let month = date.getMonth();
	let day = date.getUTCDate();
	let hour = date.getHours();
	let minute = date.getMinutes();
	let second = date.getSeconds();
	return `${year}-${month + 1}-${day}`;
};

exports.formatArticleData = data => {
	return data.map(obj => {
		newObj = { ...obj };
		if (obj['created_at']) {
			newObj['created_at'] = dateStamp(obj['created_at']);
		}
		return newObj;
	});
};

exports.commentRef = (insertedArts, comm) => {
	let result = comm.reduce((refObj, comm) => {
		refObj[comm.belongs_to] = insertedArts.filter(article => {
			return article.title === comm.belongs_to;
		})[0].article_id;
		return refObj;
	}, {});
	return result;
};

// exports.formatCommentsData = (comments, ref) => {
// 	return comments.reduce(())
// }
exports.formatCommentsData = (comments, ref) => {
	let formattedComment = comments.reduce((newArray, comment) => {
		let obj = { ...comment };
		obj['created_at'] = dateStamp(obj['created_at']);
		obj['author'] = obj['created_by'];
		delete obj['created_by'];
		obj['article_id'] = ref[comment['belongs_to']];
		delete obj['belongs_to'];
		newArray.push(obj);
		return newArray;
	}, []);
	return formattedComment;
};

//ref obj for comments - > {'belongs to value' : articleID data}
