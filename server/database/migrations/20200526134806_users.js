
exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
      users.increments()
      users.string('username')
           .unique()
           .notNullable()
      users.string('password')
           .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
