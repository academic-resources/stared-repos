const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

function get(id){
    if(id){
        return db('actions').where('id', id)
            .then(action => {
                return action[0]
            })
    }

    return db('actions')
        .then(actions => {
            return actions
        })
}

function add(action){
    return db('actions').insert(action)
        .then( ([id]) => this.get(id) )
}

function getActions(id){
    return db('actions').where('project_id', id)
        .then(actions => {
            const mapped = actions.map( x => {
                let newObj = {
                    id: x.id,
                    description: x.action_description,
                    notes: x.action_notes,
                    completed: x.completed
                }
                return newObj
            })
            return mapped
        })
}

function remove(id){
    return db('actions').where('id', id).del()
}

module.exports = {
    get, add, getActions, remove,
};