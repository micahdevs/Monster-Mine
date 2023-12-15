const User = require('./User');
const Monster = require('./Monster');

User.hasMany(Monster, {
    foreignKey: 'user_id',
  });
  
  Monster.belongsTo(User, {
    foreignKey: 'user_id',
  });

module.exports = { Monster, User };
