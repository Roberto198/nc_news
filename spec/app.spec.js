process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const supertest = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('/', () => {
	beforeEach(() => connection.seed.run());
	after(() => connection.destroy());

	it('ALL - 200 - wrong filepath', () => {
		return request
			.get('/wrongpath')
			.expect(404)
			.then(({ body }) => {
				expect(body.msg).to.eql('Route Not Found');
			});
	});

	describe('/api', () => {
		it('GET - 200 - with all correct', () => {
			return request.get('/api').expect(200);
		});
		it('ALL - 404 - incorrect path', () => {
			return request
				.get('/api/23v3cw')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).to.equal('Route Not Found');
				});
		});
	});

	describe('/api/articles', () => {
		it('GET - 200 - send all articles', () => {
			return request
				.get('/api/articles')
				.expect(200)
				.then(({ body }) => {
					expect(body.articles).to.be.an('array');
					expect(body.articles[0]).to.have.property('comment_count');
				});
		});
		it('GET - 200 - correct article by id', () => {
			return request
				.get('/api/articles/1')
				.expect(200)
				.then(({ body }) => {
					expect(body.article).to.be.an('object');
					expect(Object.keys(body.article)).to.have.members([
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
		it('GET - 200 - returns articles with queries (author)', () => {
			return request
				.get('/api/articles?author=rogersop')
				.expect(200)
				.then(({ body }) => {
					expect(body.articles).to.be.an('array');
					expect(body.articles[0].author).to.equal('rogersop');
				});
		});
		it('GET - 200 - returns articles with queries (topics)', () => {
			return request
				.get('/api/articles?topic=cats')
				.expect(200)
				.then(({ body }) => {
					expect(body.articles).to.be.an('array');
					expect(body.articles[0].topic).to.equal('cats');
				});
		});
		it('GET - 404 - returns articles with queries (incorrect topics)', () => {
			return request
				.get('/api/articles?topic=invalidTopic')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).to.equal('No such topic found');
				});
		});
		it('GET - 404 - returns articles with queries (incorrect author)', () => {
			return request
				.get('/api/articles?author=invalidAuthor')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).to.equal('No such author found');
				});
		});
		it('GET - 200 - returns articles ordered desc by created at', () => {
			return request
				.get('/api/articles')
				.expect(200)
				.then(({ body }) => {
					expect(body.articles).to.be.an('array');
					expect(body.articles[0].article_id).to.equal(1);
				});
		});
		it('GET - 200 - returns articles with queries (order asc)', () => {
			return request
				.get('/api/articles?order=asc')
				.expect(200)
				.then(({ body }) => {
					expect(body.articles).to.be.an('array');
					expect(body.articles[0].article_id).to.equal(9);
				});
		});
		it('GET - 200 - returns articles with queries (sort_by author, default = desc)', () => {
			return request
				.get('/api/articles?sort_by=author')
				.expect(200)
				.then(({ body }) => {
					expect(body.articles).to.be.an('array');
					expect(body.articles[0].author).to.equal('rogersop');
				});
		});
		it('GET - 200 - returns articles with queries (sort_by author, query = asc)', () => {
			return request
				.get('/api/articles?sort_by=author&order=asc')
				.expect(200)
				.then(({ body }) => {
					expect(body.articles).to.be.an('array');
					expect(body.articles[0].author).to.equal('butter_bridge');
				});
		});
		it('GET - 200 - returns articles with queries (sort_by id, auto order by desc)', () => {
			return request
				.get('/api/articles?sort_by=article_id')
				.expect(200)
				.then(({ body }) => {
					expect(body.articles).to.be.an('array');
					expect(body.articles[0].article_id).to.equal(9);
				});
		});
		it('GET - 200 - returns articles with queries (sort_by id, query sort by asc)', () => {
			return request
				.get('/api/articles?sort_by=article_id&order=asc')
				.expect(200)
				.then(({ body }) => {
					expect(body.articles).to.be.an('array');
					expect(body.articles[0].article_id).to.equal(1);
				});
		});
		it('GET - 200 - returns all articles when sent with incorrect query keys', () => {
			return request
				.get('/api/articles?wrongquery=cats')
				.expect(200)
				.then(({ body }) => {
					expect(body.articles).to.be.an('array');
				});
		});
		it('GET - 404 - with incorrect query values', () => {
			return request
				.get('/api/articles?topic=wrongQueryValue')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).to.equal('No such topic found');
				});
		});
		it('GET - 404 - article ID does not exist', () => {
			return request
				.get('/api/articles/999')
				.expect(404)
				.then(body => {
					expect(body.body.msg).to.equal('Article not found by this ID');
				});
		});
		it('GET - 400 - bad request, invalid article Id', () => {
			return request
				.get('/api/articles/invalidId')
				.expect(400)
				.then(({ body }) => {
					expect(body.msg).to.equal('Values must be an integer: Article_id, Inc_votes, comment_id');
				});
		});
		it('GET - 200 - get articles comments by id', () => {
			return request
				.get('/api/articles/1/comments')
				.expect(200)
				.then(({ body }) => {
					expect(body).to.be.an('object');
					expect(Object.keys(body)).to.eql(['comments', 'comment_count']);
				});
		});
		it('GET - 404 - get articles comment by id, where id not found', () => {
			return request
				.get('/api/articles/99999/comments')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).to.eql('Article not found');
				});
		});
		it('GET - 400 - get articles comment by id, where id is invalid', () => {
			return request
				.get('/api/articles/invalidId/comments')
				.expect(400)
				.then(body => {
					expect(body.body.msg).to.equal('Values must be an integer: Article_id, Inc_votes, comment_id');
				});
		});
		it('PATCH - 200 - updates an articles votes (increment)', () => {
			return request
				.patch('/api/articles/2')
				.send({ inc_votes: 10 })
				.expect(200)
				.then(({ body }) => {
					expect(body).to.be.an('object');
				});
		});
		it('PATCH - 200 - updates an articles votes (decrement)', () => {
			return request
				.patch('/api/articles/2')
				.send({ inc_votes: -10 })
				.expect(200)
				.then(({ body }) => {
					expect(body).to.be.an('object');
					expect(body.article).to.be.an('object');
				});
		});
		it('PATCH - 200 - patching an article with no body sent, still returns articles', () => {
			return request
				.patch('/api/articles/2')
				.expect(200)
				.then(({ body }) => {
					expect(body.article).to.be.an('object');
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
					expect(body.msg).to.equal('Values must be an integer: Article_id, Inc_votes, comment_id');
				});
		});
		it('PATCH - 400 - sending incorrect key in req.body', () => {
			return request
				.patch('/api/articles/1')
				.send({ banana: 10 })
				.expect(200)
				.then(({ body }) => {
					expect(body).to.be.an('object');
					expect(body.article).to.be.an('object');
				});
		});
		it('PATCH - 400 - sending incorrect value in req.body', () => {
			return request
				.patch('/api/articles/1')
				.send({ inc_votes: 'banana' })
				.expect(400)
				.then(({ body }) => {
					expect(body.msg).to.equal('Values must be an integer: Article_id, Inc_votes, comment_id');
				});
		});
		it('POST - 201 - post an article correctly', () => {
			return request
				.post('/api/articles')
				.send({ topic: 'mitch', username: 'rogersop', title: 'test title', body: 'test body' })
				.expect(201)
				.then(({ body }) => {
					expect(body).to.have.property('article');
					expect(body.article).to.have.keys([
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
		it('POST - 201 - post an article with a topic which does not exist', () => {
			return request
				.post('/api/articles')
				.send({ topic: 'newTopic', username: 'rogersop', body: 'test body', title: 'test title' })
				.expect(201)
				.then(({ body }) => {
					expect(body).to.have.property('article');
				});
		});		
		it.only('Delete - 200 - delete an article', () => {
			return request
				.delete('/api/articles/1')
				.expect(204)
				.then(({ body }) => {
					expect(body).to.be.an('object')			
				});
		});
	});

	describe('/api/comments', () => {
		it('POST - 201 - succesfully post comment', () => {
			return request
				.post('/api/articles/1/comments')
				.send({ username: 'rogersop', body: 'sample comment' })
				.expect(201)
				.then(({ body }) => {
					expect(body).to.have.keys('comment');
					expect(body.comment).to.be.an('object');
				});
		});
		it('POST - 404 - post comment to valid but not found ID', () => {
			return request
				.post('/api/articles/99999/comments')
				.send({ username: 'rogersop', body: 'sample comment' })
				.expect(404)
				.then(body => {
					expect(body.body.msg).to.equal('Article not found by this ID');
				});
		});
		it('POST - 400 - post comment to invalid article ID', () => {
			return request
				.post('/api/articles/invalidId/comments')
				.send({ username: 'rogersop', body: 'sample comment' })
				.expect(400)
				.then(body => {
					expect(body.body.msg).to.equal('Values must be an integer: Article_id, Inc_votes, comment_id');
				});
		});
		it('POST - 400 - post comment with invalid username in body', () => {
			return request
				.post('/api/articles/1/comments')
				.send({ username: 'inavlidUsername', body: 'sample comment' })
				.expect(400)
				.then(body => {
					expect(body.body.msg).to.equal('Please provide a valid username to post.');
				});
		});
		it('POST - 400 - post comment with malformed json keys', () => {
			return request
				.post('/api/articles/1/comments')
				.send({ banana: 'rogersop', banana: 'sample comment' })
				.expect(400)
				.then(({ body }) => {
					expect(body.msg).to.equal('Incorrect keys to insert comment (Please use username and body)');
				});
		});
		it('DELETE - 204 - removes a comment', () => {
			return request
				.delete('/api/comments/10')
				.expect(204)
				.then(({ body }) => {
					expect(Object.keys(body)).to.have.lengthOf(0);
				});
		});
		it('DELETE - 404 - comment not found from valid id', () => {
			return request
				.delete('/api/comments/99999')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).to.equal('Error: comment not found with this ID');
				});
		});
		it('DELETE - 400 - invalid comment id supplied', () => {
			return request
				.delete('/api/comments/invalid')
				.expect(400)
				.then(({ body }) => {
					expect(body.msg).to.equal('Values must be an integer: Article_id, Inc_votes, comment_id');
				});
		});
		it('PATCH - 200 - increment a comment vote', () => {
			return request
				.patch('/api/comments/1')
				.send({ inc_votes: 10 })
				.expect(200)
				.then(({ body }) => {
					expect(body).to.be.an('object');
					expect(body.comment).to.be.an('object');
				});
		});
		it('PATCH - 404 - increment a comment vote, comment id not found ', () => {
			return request
				.patch('/api/comments/9999')
				.send({ inc_votes: 10 })
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).to.equal('Error: Comment not found with this ID');
				});
		});
		it('PATCH - 400 - increment a comment vote, with invalid comment ID ', () => {
			return request
				.patch('/api/comments/invalidId')
				.send({ inc_votes: 10 })
				.expect(400)
				.then(({ body }) => {
					expect(body.msg).to.equal('Values must be an integer: Article_id, Inc_votes, comment_id');
				});
		});
		it('PATCH - 400 - increment a comment vote, with malformed body (incorrect vote): ', () => {
			return request
				.patch('/api/comments/1')
				.send({ inc_votes: 'banana' })
				.expect(400)
				.then(({ body }) => {
					expect(body.msg).to.equal('Values must be an integer: Article_id, Inc_votes, comment_id');
				});
		});
		it('PATCH - 200 - increment a comment vote, with malformed body (incorrect key): ', () => {
			return request
				.patch('/api/comments/1')
				.send({ invalidKey: 10 })
				.expect(200)
				.then(({ body }) => {
					expect(body.comment).to.be.an('object');
					expect(body.comment).to.have.keys([
						'comment_id',
						'author',
						'article_id',
						'votes',
						'created_at',
						'body',
					]);
				});
		});
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
		it('POST - 201 - post new topic', () => {
			return request
				.post('/api/topics')
				.send({ topic: 'newTopic', description: 'test desc' })
				.expect(201)
				.then(({ body }) => {
					expect(body).to.have.property('topic');
					expect(body.topic).to.have.keys(['slug', 'description']);
				});
		});
		it('POST - 201 - post new topic without description', () => {
			return request
				.post('/api/topics')
				.send({ topic: 'newTopic' })
				.expect(201)
				.then(({ body }) => {
					expect(body).to.have.property('topic');
					expect(body.topic).to.have.keys(['slug', 'description']);
				});
		});
		it('GET - status 405 - when trying to patch to topics', () => {
			return request
				.patch('/api/topics')
				.expect(405)
				.then(({ body }) => {
					expect(body.msg).to.equal('Method Not Allowed');
				});
		});
	});
	describe('/users', () => {
		it('will find a user by id', () => {
			return request
				.get('/api/users/butter_bridge')
				.expect(200)
				.then(({ body }) => {
					expect(body).to.be.an('object');
					expect(body).to.have.keys(['username', 'avatar_url', 'name']);
				});
		});
		it('will return a 404 when user not found', () => {
			return request
				.get('/api/users/invalidUsername')
				.expect(404)
				.then(({ body }) => {
					expect(body.msg).to.equal('User not found');
				});
		});
	});
});
