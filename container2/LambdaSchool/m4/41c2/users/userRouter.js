const express = 'express';
const users = require('./userDB');
const posts = require('../posts/postDB');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
	const reqBody = req.body;
	users
		.insert(reqBody)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Error adding user.', error });
		});
});

router.post('/:id/posts', validateUser, validatePost, (req, res) => {
	const userID = req.params.id;
	const bodyText = req.body.text;
	posts
		.insert({ user_id: userID, text: bodyText })
		.then(post => {
			res.status(200).json({ message: post });
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Error adding post.', error });
		});
});

router.get('/', validateUserId, (req, res) => {
	users
		.get()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Error retrieving users.', error });
		});
});

router.get('/:id', validateUserId, (req, res) => {
	const reqUser = req.user;
	res.status(200).json(reqUser);
});

router.get('/:id/posts', validateUserId, (req, res) => {
	const userID = req.user.id;
	users
		.getUserPosts(userID)
		.then(posts => {
			if (posts.length > 0) {
				res.status(200).json(posts);
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'Error retrieving posts.' });
		});
});

router.delete('/:id', validateUserId, (req, res) => {
	const userID = req.user.id;
	users
		.remove(userID)
		.then(() => {
			res.status(200).json({ message: `user id ${userID} was deleted` });
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'User not deleted.', error });
		});
});

router.put('/:id', (req, res) => {
	const reqBody = req.body;
	const userID = req.params.id;
	users
		.update(userID, reqBody)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'User not updated.', error });
		});
});

//custom middleware

function validateUserId(req, res, next) {
	users
		.getById(req.params.id)
		.then(user => {
			if (user) {
				req.user = user;
				next();
			} else {
				res.status(500).json({
					errorMessage: 'No user with this ID exists'
				});
			}
		})
		.catch(error => {
			res.status(500).json({ errorMessage: 'missing user ID', error });
		});
}

function validateUser(req, res, next) {
	const name = req.body.name;
	if (!name) {
		res.status(404).json({ errorMessage: "missing user's name" });
	} else {
		req.user = name;
		next();
	}
}

function validatePost(req, res, next) {
	const post = (req.body.text, req.params.id);
	if (!req.body.text) {
		res.status(404).json({ errorMessage: 'missing post text' });
	} else {
		req.text = post;
		next();
	}
}

module.exports = router;
