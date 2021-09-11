const express = require('express');
const router = express.Router();
const projectDb = require('../data/helpers/projectModel');

//GET

router.get('/', (req, res) => {
    projectDb.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Could not fetch the projects."
            })
        })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    projectDb.get(id)
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            res
            .status(404)
            .json({
                message: "That project ID does not exist."
            })
        })
});

//POST

router.post('/', (req, res) => {
    const project = req.body;
    if (project.name && project.description) {
        projectDb.insert(project)
            .then(newProject => {
                res.json(newProject)
            })
            .catch(err => {
                res
                .status(500)
                .json({
                    message: "Error adding this new project."
                })
            })
    } else if (project.name) {
        res
        .status(400)
        .json({
            message: "New projects need a description."
        })
    } else if (project.description) {
        res
        .status(400)
        .json({
            message: "New projects need a name."
        })
    } else {
        res
        .status(400)
        .json({
            message: "New projects need both a name and description."
        })
    }
});

//DELETE

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    projectDb.get(id)
        .then(action => {
            const theProject = action;
            projectDb.remove(id)
                .then(count => {
                    if(count){
                        res.json(theProject);
                    }
                })
        })
        .catch(err => {
            res
            .status(404)
            .json({
                message: "That project ID is invalid."
            })
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "This project could not be deleted."
            })
        })
});

//PUT

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const project = req.body;

    if (project.name && project.description) {
        projectDb.update(id, project)
            .then(count => {
                if ( count === null) {
                    res
                    .status(404)
                    .json({
                        message: "That project ID is invalid."
                    })
                } else {
                    projectDb.get(id)
                        .then(project => {
                            res.json(project)
                        })
                }
            })
            .catch(err => {
                res
                .status(500)
                .json({
                    message: "Unable to update this project."
                })
            })
    } else if (project.name){
        res
        .status(400)
        .json({
            message: "Projects need a description."
        })
    } else if (project.description) {
        res
        .status(400)
        .json({
            message: "Projects need a name."
        })
    } else {
        res
        .status(400)
        .json({
            message: "Projects need a name and a description."
        })
    }
});

module.exports = router;