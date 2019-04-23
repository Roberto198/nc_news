process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe.only('/', () => {
	beforeEach(() => connection.seed.run());
	after(() => connection.destroy());

	describe('/api', () => {
		it('GET - status:200 - with all correct', () => {
			return request
				.get('/api')
				.expect(200)
				.then(({ body }) => {
					expect(body.ok).to.equal(true);
				});
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
		it('GET - status 200', () => {
			return request.get('/api/articles').expect(200);
		});
	});
});
