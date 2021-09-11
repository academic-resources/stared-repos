const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

function get(id){
    if(id){
        return db('contexts').where('id', id)
            .then(context => {
                return context[0]
            })
    }

    return db('contexts')
        .then(contexts => {
            return contexts
        })
}

function add(context){
    return db('contexts').insert(context)
        .then( ([id]) => this.get(id) )
}

function getContexts(id){
    return db('contexts').where('action_id', id)
        .then(contexts => {
            const mapped = contexts.map( x => {
                let newObj = {
                    id: x.id,
                    context: x.context,
                }
                return newObj
            })
            return mapped
        })
}

module.exports = {
    get, add, getContexts
};