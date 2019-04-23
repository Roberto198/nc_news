process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('/', () => {
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

	describe.only('/api/articles', () => {
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
					console.log(body);
					expect(body).to.be.an('object');
					expect(Object.keys(body)).to.have.members([
						'article_id',
						'title',
						'body',
						'votes',
						'topic',
						'author',
						'created_at',
					]);
				});
		});
		it('GET- status 200 - ', () => {});
	});

	describe('/api/comments', () => {
		it('', () => {});
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
