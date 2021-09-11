const express = require('express')
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Album, Song, Composer, User } = require('../../db/models');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateAlbum = [
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an album title.')
    .isLength({ max: 40 })
    .withMessage('Album title must be 40 characters or less.'),
  check('releaseDate')
    .exists({ checkFalsy: true })
    .isLength({ min:4, max:4 })
    .isInt({ min: 1880 })
    .withMessage('Please enter a valid year.'),
  handleValidationErrors,
];

// create album
router.post(
  '/new',
  requireAuth,
  singleMulterUpload("photo"),
  validateAlbum,
  asyncHandler(async (req, res) => {
    let album;
    const { title, artistId, releaseDate, description } = req.body;
    if (req.file) {
      const imageUrl = await singlePublicFileUpload(req.file);
      album = await Album.create({ title, artistId, releaseDate, imageUrl, description });
    } else {
      album = await Album.create({ title, artistId, releaseDate, description });
    }

    return res.json({
      album,
    });
  }),
);

// access a single album
router.get('/:id(\\d+)', asyncHandler(async function(req, res) {
  const album = await Album.findByPk(req.params.id, {
    include: {
      model: Song,
      include: Composer
    }
  });
  if (album) {
    const artist = await User.findByPk(album.artistId)
    return res.json({album, artist});
  } else {
    return res.status(404).json({errors: "this album does not exist."})
  }
}));

//delete a single album
router.delete('/:id(\\d+)', asyncHandler(async function(req, res) {
  const album = await Album.findByPk(req.params.id);
  album.destroy();
  return res.json({ message: 'success' });
}));

// update a single album
router.patch(
  '/:id(\\d+)',
  requireAuth,
  singleMulterUpload("photo"),
  validateAlbum,
  asyncHandler(async function (req, res) {
    const album = await Album.findByPk(req.params.id)
    if (req.file) {
      const imageUrl = await singlePublicFileUpload(req.file);
      req.body.imageUrl = imageUrl;
    }
    await album.update(req.body);
    return res.json({album});
  })
);

// access all of a user's albums
router.get('/user/:id(\\d+)',
  requireAuth,
  asyncHandler(async function (req, res) {
    const albums = await Album.findAll({
      where: { artistId: req.params.id },
      include: {
        model: Song,
        include: Composer
      }
    })
    return res.json({albums})
  })
)

// access all albums
router.get('/',
  requireAuth,
  asyncHandler(async function (req, res) {
    const albums = await Album.findAll({
      include: [User,
      // include:
      {
        model: Song,
        include: Composer
      }]
    })
    return res.json({albums})
  })
)

module.exports = router;
