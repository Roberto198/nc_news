exports.up = function(knex, Promise) {
	return knex.schema.createTable('articles', articles => {
		articles.increments('article_id').primary();
		articles.string('title');
		articles.text('body');
		articles.integer('votes').defaultTo(0);
		articles.string('topic');
		articles.foreign('topic').references('topics.slug');
		articles.text('author');
		articles
			.foreign('author')
			.references('username')
			.inTable('users');
		articles.date('created_at').defaultTo(knex.fn.now(0));
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('articles');
};
