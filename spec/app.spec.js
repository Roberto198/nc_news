process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe.only('/', () => {
	beforeEach(() => connection.seed.run());
	after(() => connection.destroy());

	it('ALL - status 404 - wrong filepath', () => {
		return request
			.get('/wrongpath')
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).to.equal('Route Not Found');
			});
	});

	describe('/api', () => {
		it('GET - status:200 - with all correct', () => {
			return request.get('/api').expect(200);
		});
		it('ALL - status 404 - incorrect path', () => {
			return request
				.get('/api/23v3cw')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).to.equal('Route Not Found');
				});
		});
	});

	describe('/api/articles', () => {
		it('GET - status 200 - send all articles', () => {
			return request
				.get('/api/articles')
				.expect(200)
				.then(({ body }) => {
					expect(body.articles).to.be.an('array');
					expect(body.articles[0]).to.have.property('comment_count');
				});
		});
		it('GET - status 200 - correct article by id', () => {
			return request
				.get('/api/articles/1')
				.expect(200)
				.then(({ body }) => {
					expect(body).to.be.an('object');
					expect(Object.keys(body)).to.have.members([
						'article_id',
						'title',
						'body',
						'votes',
						'topic',
						'author',
						'created_at',
						'comment_count',
					]);
				});
		});
		it('GET- status 404 - article ID does not exists', () => {
			return request
				.get('/api/articles/999')
				.expect(404)
				.then(body => {
					expect(body.body.msg).to.equal('Article not found by this ID');
				});
		});
		it('GET - status 400 - bad request, invalid article Id', () => {
			return request
				.get('/api/articles/invalidId')
				.expect(400)
				.then(({ body }) => {
					expect(body.msg).to.equal('Invalid ID type');
				});
		});
		it('PATCH - 201 - updates an articles votes', () => {
			return request
				.patch('/api/articles/2')
				.send({ inc_votes: 10 })
				.expect(201)
				.then(({ body }) => {
					expect(body).to.be.an('object');
					expect(body.updated_article).to.be.an('object');
				});
		});
		it('PATCH - 404 - patching to valid id which doesnt exist', () => {
			return request
				.patch('/api/articles/999')
				.send({ inc_votes: 10 })
				.expect(404)
				.then(body => {
					expect(body.body.msg).to.equal('Article not found by this ID');
				});
		});
		it('PATCH - 400 - patching to invalid article id.', () => {
			return request
				.patch('/api/articles/invalidId')
				.send({ inc_votes: 10 })
				.expect(400)
				.then(({ body }) => {
					expect(body.msg).to.equal('Invalid ID type');
				});
		});
		it('PATCH - 400 - sending incorrect body, model will not patch anything and still return', () => {
			return request
				.patch('/api/articles/1')
				.send({ banana: 10 })
				.expect(400)
				.then(({ body }) => {
					expect(body.msg).to.equal('Incorrect body. No vote found.');
				});
		});
	});

	describe('/api/comments', () => {
		it('GET - 200 - reponds with ', () => {});
	});

	describe('/api/topics', () => {
		it('GET - status 200 - responds with all topics', () => {
			return request
				.get('/api/topics')
				.expect(200)
				.then(({ body }) => {
					expect(body.topics).to.be.an('array');
					expect(body.topics[0]).to.have.property('slug');
					expect(body.topics[0]).to.have.property('description');
				});
		});
	});
});
