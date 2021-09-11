const express = 'express';
const users = require('./userDB');
const posts = require('../posts/postDB');

const router = express.Router();

router.get('/', validatePostId, (req, res) => {
	posts
		.get()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Error retrieving users.', error });
		});
});

router.get('/:id', validatePostId, (req, res) => {
	const postID = req.params.id;
	posts
		.getUserPosts(postID)
		.then(post => {
			res.status(200).json(post);
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Posts for this user not available.', error });
		});
	res.status(200).json(reqPost);
});

router.delete('/:id', validatePostId, (req, res) => {
	const postID = req.params.id;
	posts
		.remove(postID)
		.then(() => {
			res.status(200).json({ message: `Post ${postID} was deleted` });
		})
		.catch(error => {
			res.status(500).json({ errorMessage: `Post ${postID} not deleted.`, error });
		});
});

router.put('/:id', (req, res) => {
	const postID = req.params.id;
	const postText = req.params.text;
	const userID = req.params.user_id;
	posts
		.update(postID, postText)
		.then(post => {
			res.status(200).json(post);
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Post not updated.', error });
		});
});

// custom middleware

function validatePostId(req, res, next) {
	const postID = req.params.id;
	posts
		.getById(postID)
		.then(post => {
			if (postID) {
				req.text = post;
				next();
			} else {
				res.status(500).json({
					errorMessage: 'No post with this ID exists'
				});
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'missing post ID', error });
		});
}

module.exports = router;
