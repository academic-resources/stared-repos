const { Player } = require("./models");

class NullPlayer {
  isValid() {
    return false;
  }
  setPassword() {}
  isValidPassword() {
    return false;
  }
  toSafeObject() {
    return {};
  }
}

async function create(details) {
  const player = await Player.build(details);
  player.setPassword(details.password);
  return await player.save();
}

async function findByEmail(email) {
  const player = await Player.findOne({ where: { email } });
  return player || new NullPlayer();
}

async function findByTokenId(tokenId) {
  const player = await Player.findOne({ where: { tokenId } });
  return player || new NullPlayer();
}

module.exports = {
  create,
  findByEmail,
  findByTokenId,
};
