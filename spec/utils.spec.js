const { expect } = require('chai');
var chai = require('chai');
chai.use(require('chai-datetime'));
const { createUserRef, formatArticleData, commentRef, formatCommentsData } = require('../utils/utils');

describe('createUserRef():', () => {
	data = [
		{
			username: 'tickle122',
			name: 'Tom Tickle',
			avatar_url: 'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
		},
	];

	biggerData = [
		{
			username: 'tickle122',
			name: 'Tom Tickle',
			avatar_url: 'https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg',
		},
		{
			username: 'grumpy19',
			name: 'Paul Grump',
			avatar_url: 'https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg',
		},
	];

	it('produces a new object', () => {
		expect(createUserRef(data, 'username', 'name')).to.not.equal(data);
	});
	it('pulls and matches the correct key and value and puts them in a new object', () => {
		expect(createUserRef(data, 'username', 'name')).to.eql({ tickle122: 'Tom Tickle' });
	});
	it('will work on an array of objects', () => {
		expect(createUserRef(biggerData, 'username', 'name')).to.eql({
			tickle122: 'Tom Tickle',
			grumpy19: 'Paul Grump',
		});
	});
});

describe('formatArticleData()', () => {
	let smallData = [
		{
			title: 'Running a Node App',
			topic: 'coding',
			author: 'jessjelly',
			body:
				'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
			created_at: 1471522072389,
		},
	];

	let biggerData = [
		{
			title: 'Running a Node App',
			topic: 'coding',
			author: 'jessjelly',
			body:
				'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
			created_at: 1471522072389,
		},
		{
			title: "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
			topic: 'coding',
			author: 'jessjelly',
			body:
				'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
			created_at: 1500584273256,
		},
	];

	it('will convert the timestamp in an object to Date notation:', () => {
		let testResult = formatArticleData(smallData);
		expect(testResult[0].created_at).to.equalDate(new Date(1471522072389));
	});

	it('will work for an array of objects:', () => {
		let testResult = formatArticleData(biggerData);
		expect(testResult[0].created_at).to.equalDate(new Date(1471522072389));
		expect(testResult[1].created_at).to.equalDate(new Date(1500584273256));
	});
});

describe('commentRef', () => {
	it("created a new object with 'belongs_to value' : 'article_id value'", () => {
		const comment = [
			{
				body:
					'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
				belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
				created_by: 'tickle122',
				votes: -1,
				created_at: 1468087638932,
			},
		];
		const article = [
			{
				article_id: 6,
				title: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
				topic: 'coding',
				author: 'jessjelly',
				body:
					'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
				created_at: 1500584273256,
			},
		];
		expect(commentRef(article, comment)).to.eql({
			'The People Tracking Every Touch, Pass And Tackle in the World Cup': 6,
		});
	});
});

describe('formatCommentsData():', () => {
	const comment = [
		{
			body:
				'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
			belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
			created_by: 'tickle122',
			votes: -1,
			created_at: 1468087638932,
		},
	];
	const twoComments = [
		{
			body:
				'Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.',
			belongs_to: 'The People Tracking Every Touch, Pass And Tackle in the World Cup',
			created_by: 'tickle122',
			votes: -1,
			created_at: 1468087638932,
		},
		{
			body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
			belongs_to: 'Making sense of Redux',
			created_by: 'grumpy19',
			votes: 7,
			created_at: 1478813209256,
		},
	];
	const refObj = {
		'The People Tracking Every Touch, Pass And Tackle in the World Cup': 18,
		'Making sense of Redux': 4,
	};
	it('creates a new object / does not mutate data', () => {
		expect(formatCommentsData(comment, refObj)).to.not.eql(comment);
	});
	it("will change 'created_by' to 'author':", () => {
		let x = formatCommentsData(comment, refObj);
		expect(x[0]).to.have.property('author');
	});
	it('will change belongs to to an article id', () => {
		let x = formatCommentsData(comment, refObj);
		expect(x[0]).to.have.property('article_id');
		expect(x[0].article_id).to.be.a('number');
	});
	it('will work on a larger array.', () => {
		let testResult = formatCommentsData(twoComments, refObj);
		expect(Object.keys(testResult[0])).to.have.members(['body', 'votes', 'created_at', 'author', 'article_id']);
		expect(Object.keys(testResult[1])).to.have.members(['body', 'votes', 'created_at', 'author', 'article_id']);
		expect(testResult[0].created_at).to.eql(new Date(1468087638932));
		expect(testResult[1].created_at).to.eql(new Date(1478813209256));
	});
});
