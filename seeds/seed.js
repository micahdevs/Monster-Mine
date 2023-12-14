const sequelize = require('../config/connection');
const seedMonsters = require('./monster-seed');
//const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  //await seedUsers()
  await seedMonsters()
  
  process.exit(0);
};

seedAll();