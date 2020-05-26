exports.up = function (knex) {
    return knex.schema
        .createTable('memories', mems => {
            mems.increments()
            mems.blob('image')
                .notNullable()
            mems.string('description')
                .notNullable()
            mems.integer('user_id')
                .notNullable()
                .references('id')
                .inTable('users')
            
        })
};

exports.down = function (knex) {
    knex.string.dropTable('memories')
        
};