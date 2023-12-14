const sequelize = require('../config/connection');
const seedMonsters = require('./monster-seed');
const { Monster } = require('../models');
//const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const Monsters = await Monster.bulkCreate(seedMonsters, {

  });

  process.exit(0);
};

seedAll();