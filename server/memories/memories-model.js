const db = require('../database/dbConfig');

module.exports.getUser = id => db('users').where({ id }).first()

module.exports.getUserMemories = id => db('memories as m')
    .select('m.*')
    .where({ user_id: id})
    

module.exports.addMemory = memory => db('memories').insert(memory, 'id')
.then(() => module.exports.getUserTabs(memory.user_id))

module.exports.updateMemory = (memory, id) => db('memories').update(memory).where({id})
    .then(() => module.exports.getUserMemories(memory.user_id))

module.exports.deleteMemory = (user_id, id) => db('memories').delete().where({id})
    .then(() => module.exports.getUserMemories(user_id)) 

module.exports.memories = () => db('memories')