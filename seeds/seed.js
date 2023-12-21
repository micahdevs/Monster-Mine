const sequelize = require('../config/connection');
const seedMonsters = require('./monster-seed');
const seedUsers = require('./user-seed.json');
const { Monster, User } = require('../models');
//const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(seedUsers);
  await Monster.bulkCreate(seedMonsters);

  process.exit(0);
};

module.exports = { seedAll };

