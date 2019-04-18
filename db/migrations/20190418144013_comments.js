exports.up = function(knex, Promise) {
	return knex.schema.createTable('comments', comments => {
		comments.increments('comment_id');
		comments.string('author');
		comments.foreign('author').references('users.username');
		comments.integer('article_id');
		comments.foreign('article_id').references('articles.article_id');
		comments.integer('votes').defaultTo(0);
		comments.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
		comments.string('body');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('comments');
};
