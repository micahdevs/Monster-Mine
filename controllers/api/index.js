const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const monsterRoutes = require('./monster-routes.js');

router.use('/user', userRoutes);
router.use('/monster', monsterRoutes);

module.exports = router;