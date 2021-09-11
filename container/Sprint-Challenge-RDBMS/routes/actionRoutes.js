const express = require('express');
const router = express.Router();

const db = require('../data/actionsModel');
const projectDb = require('../data/projectsModel');
const contextDb = require('../data/contextsModel');

router.get('/', (req, res) => {
    db.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(err => {
            res.status(500).json({ message: "Could not fetch those actions. They've disappeared!" })
        })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db.get(id)
        .then(action => {
            if(Object.keys(action).length === 0){
                res.status(404).json({ message: "That's not a valid action ID, didn't you know?" })
            } else {
                let actionObj = action;
                contextDb.getContexts(id)
                    .then(response => {
                        res.json({
                            id: actionObj.id,
                            description: actionObj.action_description,
                            notes: actionObj.action_notes,
                            completed: actionObj.completed,
                            contexts: response
                        })
                    })
                    .catch(err => res.status(500).json({message: 'Ooops could not fetch that info.' }))
            }
        })
        .catch(err => {
            res.status(500).json({ message: "That action is MIA and could not be fetched. Oops." })
        })
});


router.post('/', (req, res) => {
    const action = req.body;
    const id = req.body.project_id;
    if(action.action_description && action.action_notes && action.project_id){
        projectDb.get(id)
            .then(project => {
                if(Object.keys(project).length === 0){
                    res.status(404).json({ message: "That's an invalid project ID!" })
                } else {
                    db.add(action)
                        .then(newAction => {
                            res.status(201).json(newAction)
                        })
                        .catch(err => {
                            res.status(404).json({ message: "There was an error adding this action to the project" })
                        })
                }
            })
            .catch(err => res.status(404).json({ message: "That's an invalid project ID!" }))
    } else if(action.action_description && action.action_notes){
        res.status(400).json({ message: "We need to know which project this goes to. What's the project ID?" })
    } else if (action.action_description && action.project_id){
        res.status(400).json({ message: "Add a note. What's this action about? How will you get it done?" })
    } else if (action.action_notes && action.project_id){
        res.status(400).json({ message: "New actions require a description! Get to it." })
    } else {
        res.status(400).json({ message: "New actions need many things. A description. Notes. A valid project id. I know, it's a lot." })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    db.get(id)
        .then(action => {
            const theAction = action;
            if(Object.keys(action).length === 0){
                res.status(400).json({ message: "That action ID is invalid!" })
            } else {
                db.remove(id)
                    .then(response => {
                        if(response){
                            res.json(theAction)
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ message: "This action is impenetrable and cannot be deleted." })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "This action could not be located. It sensed your sinister intentions and ran." })
        })
})

module.exports = router;