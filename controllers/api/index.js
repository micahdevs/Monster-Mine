const router = require('express').Router();

const userRoutes = require('./user-routes');
const forumRoutes = require('./forum-routes');
const monsterRoutes = require('./monster-routes');

router.use('/user', userRoutes);
router.use('/forum', forumRoutes);
router.use('/monster', monsterRoutes);

module.exports = router;