const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.JAWSDB_URL, {
  logging: true, // Logs SQL queries
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true, // Important if you are using a secure connection
    },
  },
});

module.exports = sequelize;