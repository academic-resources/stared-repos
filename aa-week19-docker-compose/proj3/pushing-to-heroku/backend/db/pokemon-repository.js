const { commerce } = require("faker");
const { Pokemon } = require("./models");

function random100() {
  return Math.floor(Math.random() * 100) + 1;
}

function randomImage() {
  const images = [
    "/images/pokemon_berry.svg",
    "/images/pokemon_egg.svg",
    "/images/pokemon_potion.svg",
    "/images/pokemon_super_potion.svg",
  ];
  const index = Math.floor(Math.random() * images.length);
  return images[index];
}

function* generateItems() {
  for (let i = 0; i < 3; i += 1) {
    yield {
      name: commerce.productName(),
      price: random100(),
      happiness: random100(),
      imageUrl: randomImage(),
    };
  }
}

async function create(details, owner) {
  details.playerId = owner.id;
  details.items = [...generateItems()];
  const pokemon = await Pokemon.create(details, { include: ["items"] });
  return pokemon.id;
}

async function list() {
  return await Pokemon.findAll({
    attributes: ["imageUrl", "name", "updatedAt", "id"],
  });
}

async function one(id) {
  const pokemon = await Pokemon.findByPk(id, {
    include: ["items", "player"],
  });

  return {
    attack: pokemon.attack,
    defense: pokemon.defense,
    id: pokemon.id,
    imageUrl: pokemon.imageUrl,
    name: pokemon.name,
    type: pokemon.type,
    moves: [...pokemon.moves],
    items: pokemon.items.map((item) => {
      return {
        name: item.name,
        price: item.price,
        happiness: item.happiness,
        imageUrl: item.imageUrl,
      };
    }),
    owner: {
      id: pokemon.player.id,
      name: pokemon.player.name,
    },
  };
}

module.exports = {
  create,
  list,
  one,
};
