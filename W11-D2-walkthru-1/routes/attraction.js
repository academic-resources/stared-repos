
const express = require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

router.get('/attraction/:id(\\d+)', asyncHandler(async (req, res) => {
  const attractionId = parseInt(req.params.id, 10);
  const attraction = await db.Attraction.findByPk(attractionId, { include: ['park'] });
  res.render('attraction-detail', { title: 'Attraction Detail', attraction });
}));

const attractionValidators = [
  check('attractionName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Attraction Name')
    .isLength({ max: 255 })
    .withMessage('Attraction Name must not be more than 255 characters long'),
  check('theme')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Theme')
    .isLength({ max: 100 })
    .withMessage('Theme must not be more than 100 characters long'),
  check('opened')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Opened')
    .isISO8601()
    .withMessage('Please provide a valid date for Opened'),
  check('ridersPerVehicle')
    .isInt({ min: 0 })
    .withMessage('Please provide a valid positive integer for Riders per Vehicle'),
];

router.get('/park/:parkId(\\d+)/attraction/add', csrfProtection,
  asyncHandler(async (req, res) => {
    const parkId = parseInt(req.params.parkId, 10);
    const park = await db.Park.findByPk(parkId);
    const attraction = db.Attraction.build();
    res.render('attraction-add', {
      title: 'Add Attraction',
      park,
      attraction,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/park/:parkId(\\d+)/attraction/add', csrfProtection, attractionValidators,
  asyncHandler(async (req, res) => {
    const parkId = parseInt(req.params.parkId, 10);
    const park = await db.Park.findByPk(parkId);

    const {
      attractionName,
      theme,
      opened,
      ridersPerVehicle,
    } = req.body;

    const attraction = db.Attraction.build({
      parkId,
      attractionName,
      theme,
      opened,
      ridersPerVehicle,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await attraction.save();
      res.redirect(`/park/${parkId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('attraction-add', {
        title: 'Add Attraction',
        park,
        attraction,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));

router.get('/attraction/edit/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const attractionId = parseInt(req.params.id, 10);
    const attraction = await db.Attraction.findByPk(attractionId, { include: ['park'] });
    res.render('attraction-edit', {
      title: 'Edit Attraction',
      park: attraction.park,
      attraction,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/attraction/edit/:id(\\d+)', csrfProtection, attractionValidators,
  asyncHandler(async (req, res) => {
    const attractionId = parseInt(req.params.id, 10);
    const attractionToUpdate = await db.Attraction.findByPk(attractionId, { include: ['park'] });

    const {
      attractionName,
      theme,
      opened,
      ridersPerVehicle,
    } = req.body;

    const attraction = {
      attractionName,
      theme,
      opened,
      ridersPerVehicle,
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await attractionToUpdate.update(attraction);
      res.redirect(`/attraction/${attractionId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('attraction-edit', {
        title: 'Edit Attraction',
        park: attractionToUpdate.park,
        attraction: { ...attraction, id: attractionId },
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));

router.get('/attraction/delete/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const attractionId = parseInt(req.params.id, 10);
    const attraction = await db.Attraction.findByPk(attractionId, { include: ['park'] });
    res.render('attraction-delete', {
      title: 'Delete Attraction',
      attraction,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/attraction/delete/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const attractionId = parseInt(req.params.id, 10);
    const attraction = await db.Attraction.findByPk(attractionId);
    await attraction.destroy();
    res.redirect(`/park/${attraction.parkId}`);
  }));

module.exports = router;
