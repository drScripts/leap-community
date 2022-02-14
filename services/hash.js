const bcrypt = require("bcryptjs");

const HASH_ROUND = 10;

const hash = (string) => {
  return bcrypt.hashSync(string, HASH_ROUND);
};

const compare = (string, hashed) => {
  return bcrypt.compareSync(string, hashed);
};

module.exports = {
  hash,
  compare,
};
