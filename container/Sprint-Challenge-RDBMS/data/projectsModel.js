const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

function get(id){
    if(id){
        return db('projects').where('id', id)
            .then(project => {
                return project[0]
            })
    }

    return db('projects')
        .then(projects => {
            return projects
        })
}

function add(project){
    return db('projects').insert(project)
        .then( ([id]) => this.get(id) )
}

module.exports = {
    get, add,
};
