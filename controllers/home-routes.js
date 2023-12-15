const router = require('express').Router();

//TO DO - Update the Model
const { Monster } = require('../models/index.js');

//TO CHECK : When the home page is loaded, GET call the most recently created monsters
router.get('/', async (req, res ) => {
    try {
        const dbMonsterData = await Monster.findAll({ //TO DO - Update the Model
            //order: ['createdAt', 'DESC'],
            limit: 20,
        });
        const monster = dbMonsterData.map((posts) =>
            posts.get({ plain: true })
        );
        //console.log(monster_posts);
        res.render('homepage', {
            monster,
            loggedIn: req.session.loggedIn,
        });
        
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});


// TO CHECK When a USER hits LOGIN They are taken to the LOGIN page
router.get('/login', (req, res) => {
    try {
        if (req.session.loggedIn) {
        res.redirect('/');
          return;
        }
        res.render('login');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
  });

module.exports = router;