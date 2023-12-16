const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const chamberRoutes = require('./chamber-routes.js');
const uploadRoutes = require('./upload-routes.js');

router.use('/', homeRoutes); //Where we display the Home page
router.use('/api', apiRoutes);
router.use('/chamber', chamberRoutes) //Where we let the user access and make new monsters
router.use('/upload', uploadRoutes) // upload images to the uploads folder, stores image path in monster table (image field)

module.exports = router;
