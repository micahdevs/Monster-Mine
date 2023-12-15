const sequelize = require('../config/connection');
const seedMonsters = require('./monster-seed');
const { Monster, User } = require('../models');
//const seedUsers = require('./userData');

// const seedAll = async () => {
//   await sequelize.sync({ force: true });

//   await Monster.bulkCreate(seedMonsters);

//   process.exit(0);
// };

// seedAll();

const seedAll = async () => {
  try {
    // Seed users
    const user1 = await User.create({
      username: 'testUsername',
      email: 'test@gmail.com',
      password: 'test1234',
    });

    await Monster.bulkCreate([
      {
        name: 'Justalich',
        user_id: user1.id, 
      },
      {
        name: 'MitchellMinion',
        user_id: user1.id, 
      },
    ]);

    console.log('Seed successful!');
  } catch (error) {
    console.error('Seed failed:', error);
  }
};

seedAll();