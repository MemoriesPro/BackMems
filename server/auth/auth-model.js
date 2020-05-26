const db = require('../database/dbConfig')

module.exports.insert = user => db('users').insert(user, 'id')

module.exports.get = filter => db('users').where(filter)