const express = require('express');

const router = express.Router();
const postDb = require('../data/helpers/postDb');

//GET

router.get('/', (req, res) => {
    postDb.get()
    .then((posts)=>{
        if (posts.length > 0) {
            res.json(posts)
        } else {
            res
            .status(404)
            .json({
                message: "There are no quotes. The Hobbits appear to be mute right now."
            })
        }
    })
    .catch(err => {
        res
        .status(500)
        .json({
            message: "Could not fetch those quotes. They're hiding."
        })
    })
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    postDb.get(id)
        .then(posts => {
            console.log("get posts", posts);
            if(posts) {
                res.json(posts)
            } else {
                res
                .status(404)
                .json({
                    message: "This does not correspond to any notable quotes. Perhaps search for a better one."
                })
            }
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: "Failed to find those quotes."
            })
        })
});















module.exports = router;