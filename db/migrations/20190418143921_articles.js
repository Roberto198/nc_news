exports.up = function(knex, Promise) {
	return knex.schema.createTable('articles', articles => {
		articles.increments('article_id').primary();
		articles.string('title');
		articles.string('body');
		articles.integer('votes').defaultTo(0);
		articles.string('topic');
		articles.foreign('topic').references('topics.slug');
		articles.string('author');
		articles.foreign('author').references('users.username');
		articles.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('articles');
};
