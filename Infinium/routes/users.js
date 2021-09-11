const express = require('express');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3'); 
const uuid = require('uuid').v4; 
const router = express.Router();
const { userRegValidators, userSignInValidators } = require('../validations/users');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const{loginUser, logoutUser, requireAuth} = require('../auth');
const { Op } = require("sequelize");
const path = require('path');
const fs = require('fs');

const { User, Story, Follower } = require('../db/models')
const { csrfProtection,
        asyncHandler,
        setHexadecimal,
      } = require('./utils');

/* GET the main user page */
router.get('/:userId(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const userId = req.params.userId
  const user = await User.findByPk(userId, {
    include: Story
  })
  const description = user.description;
  const avatar = user.avatar;

  const findAllFollowers = await Follower.findAll({
    where: {
      userId: userId
    }
  });
  const findAllFollowing = await Follower.findAll({
    where: {
      followerId: userId
    }
  });

  const followerCount = findAllFollowers.length;
  const followingCount = findAllFollowing.length;
  let authUser = null;
  let followCompare = null;
  if (res.locals.authenticated) { //Only check logged in users
    authUser = res.locals.user.id;

    followCompare = await Follower.findOne({
      where: {
        [Op.and]: [
          { userId: userId },
          { followerId: authUser }
        ]
      }
    })
  }
  const authCompare = parseInt(authUser, 10) === parseInt(userId, 10);
  const stories = user.Stories.map(story => {
    story.hexId = setHexadecimal(story.id)
    return story;
  });

  const name = user.username;
  res.render('user', {
    title: 'User',
    stories,
    authCompare,
    followCompare,
    followerCount,
    followingCount,
    userId,
    name,
    description,
    avatar,
    token: req.csrfToken()
  });
}));

/*PUT user description*/
router.put('/:userId(\\d+)/description', requireAuth, asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const newDescription = req.body.description;
  const user = await User.findByPk(userId);
  user.description = newDescription;
  await user.save();
}));

/*PUT user image*/
// define multer middleware for use specifically on this image route
const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'infinium-user-upload', 
    metadata: (req, file, cb) => {
      cb(null, Object.assign({}, req.body.inpFile))
    }, 
    key: (req, file, cb) => { 
      cb(null, file.originalname); 
    },
  })
});

router.post('/image', requireAuth, upload.single('inpFile'), asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findByPk(userId);
  const fileName = req.file.originalname;
  user.avatar = `https://infinium-user-upload.s3.amazonaws.com/${fileName}`;
  user.save();
  return res.json({image: user.avatar}); 
}));

/* GET register form. */
router.get('/register', csrfProtection, (req, res) => {
  const user = User.build();
  res.render('sign-up', {
    title: 'Sign-up',
    user,
    token: req.csrfToken()
  })
});

/* POST register form. */
router.post('/register', csrfProtection, userRegValidators, asyncHandler(async (req, res) => {
  const {
    email,
    username,
    password
  } = req.body;

  const user = User.build({
    username,
    email
  })

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.hashedPassword = hashedPassword;
    await user.save();
    loginUser(req, res, user)
    res.redirect('/');
  } else {
    const errors = validatorErrors.array().map(error => error.msg);
    res.render('sign-up', {
      title: 'Sign-up',
      user,
      errors,
      token: req.csrfToken(),
    })
  }
}));

/* GET user log-in. */
router.get('/login', csrfProtection, (req, res) => {
  res.render('log-in', {
    title: 'Log-in',
    token: req.csrfToken()
  })
})

/* POST user log-in. */
router.post('/login', csrfProtection, userSignInValidators, asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  let errors = [];
  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    let user;
    if (usernameOrEmail.includes('@')) {
      user = await User.findOne({ where: { email: usernameOrEmail } })
    } else {
      user = await User.findOne({ where: { username: usernameOrEmail } })
    }
    if (user !== null) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
      if (passwordMatch) {
        loginUser(req, res, user)
        return req.session.save(function () {
          res.redirect('/')
        })
      }
    }
    errors.push('Login failed')
  } else {
    errors = validatorErrors.array().map(error => error.msg);
  }

  res.render('log-in', {
    title: 'Log-in',
    usernameOrEmail,
    errors,
    token: req.csrfToken()
  })
}))

/* POST user log-out. */

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  return req.session.save(function () {
    res.redirect('/')
  })
});


module.exports = router;
