exports.up = function(knex, Promise) {
	return knex.schema.createTable('topics', topics => {
		topics
			.string('slug')
			.primary()
			.notNullable();
		topics.string('description');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('topics');
};
