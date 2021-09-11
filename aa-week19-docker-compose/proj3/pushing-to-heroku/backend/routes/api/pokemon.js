const express = require("express");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const { types } = require("../../db/models/pokemonTypes");

const { authenticated } = require("./security-utils");
const PokemonRepository = require("../../db/pokemon-repository");

const router = express.Router();

const attack = check("attack").notEmpty().isInt({ min: 0, max: 100 }).toInt();
const defense = check("defense").notEmpty().isInt({ min: 0, max: 100 }).toInt();
const imageUrl = check("imageUrl")
  .notEmpty()
  .isURL({ require_protocol: false, require_host: false });
const name = check("name").notEmpty();
const type = check("type").notEmpty().isIn(types);
const moves = check("moves").isArray();

router.get(
  "/",
  authenticated,
  asyncHandler(async function (_req, res) {
    const pokemon = await PokemonRepository.list();
    res.json(pokemon);
  })
);

router.post(
  "/",
  [...authenticated, attack, defense, imageUrl, name, type, moves],
  asyncHandler(async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next({ status: 422, errors: errors.array() });
    }

    const id = await PokemonRepository.create(req.body, req.player);
    return res.redirect(`${req.baseUrl}/${id}`);
  })
);

router.get(
  "/types",
  authenticated,
  asyncHandler(async function (_req, res) {
    res.json(types);
  })
);

router.get(
  "/:id",
  authenticated,
  asyncHandler(async function (req, res) {
    const pokemon = await PokemonRepository.one(req.params.id);
    res.json(pokemon);
  })
);

module.exports = router;
