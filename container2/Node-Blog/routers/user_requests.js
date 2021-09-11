const express = require('express');

const router = express.Router();
const userDb = require('../data/helpers/userDb');
const customMiddleware = require('../Custom_Middleware');


router.get('/', (req, res) => {
    userDb.get()
        .then((users) => {
            if (users.length > 0) {
                res.json(users)
            } else {
                res
                .status(404)
                .json({
                    message: "There are currently no Hobbits in the Shire. Check back later or go create a new one."
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Could not fetch the Hobbits. They're hiding."
            })
        })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
        .then(user => {
            if(user) {
                res.json(user)
            } else {
                res
                .status(404)
                .json({
                    message: "This hobbit does not exist."
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Failed to find this hobbit"
            })
        })
});

router.get('/:id/posts', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
        .then(user => {
            if (user) {
                userDb.getUserPosts(id)
                    .then(posts => {
                        if (posts.length > 0) {
                            res.json(posts);
                        } else {
                            res
                            .status(404)
                            .json({
                                message: "This Hobbit has said nothing worth writing down."
                            })
                        }
                    })
            } else {
                res
                .status(404)
                .json({
                    message: "This Hobbit does not exist so we cannot quote it."
                })
            }
        })
        .catch(err=>{
            res
            .status(500)
            .json({
                message: "Failed to find this Hobbit or its quotes."
            })
        })
});

//POST

router.post('/', customMiddleware.uppercase, (req, res) => {
    const user = customMiddleware.upperName;
    if (user) {
        userDb.insert(user)
            .then(userId => {
                userDb.get(userId.id)
                    .then(user => {
                        res.json(user)
                    })
            })
            .catch(err => {
                res
                .status(500)
                .json({
                    message: "Could not create a new Hobbit."
                })
            })
    } else {
        res
        .status(400)
        .json({
            message: "A new Hobbit needs a name. How else can we call for it?"
        })
    }
})

//DELETE

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    userDb.get(id)
        .then(user => {
            if (user) {
                const theUser = user;
                userDb.remove(id)
                    .then(count => {
                        if (count){
                            res
                            .json(theUser)
                        }
                    })
            } else {
                res
                .status(404)
                .json({
                    message: "That id doesn't correspond to any Hobbits here. Are you sure that was the right one?"
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "This Hobbit is stronger than you, puny human. You cannot vanquish it with a mere click."
            })
        })
});

//PUT

router.put('/:id', customMiddleware.uppercase, (req, res) => {
    const {id} = req.params;
    const user = customMiddleware.upperName;
    userDb.update(id, user)
        .then(count => {
            if(count){
                userDb.get(id)
                    .then(user => {
                        res.json(user)
                    })
            } else {
                res
                .status(404)
                .json({
                    message: "Invalid ID. Are you sure that Hobbit exists?"
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "There was an error updating this Hobbit. It didn't like your new suggested name very much. Try again."
            })
        })
});


module.exports = router;