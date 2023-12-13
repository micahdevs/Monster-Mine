const router = require('express').Router();

//TO DO - Update the Model
const { BlogPost } = require('../models/index.js');

//TO CHECK : When the home page is loaded, GET call the most recently created monsters
router.get('/', async (req, res ) => {
    try {
        const dbMonsterPostData = await BlogPost.findAll({ //TO DO - Update the Model
            order: [Task, 'createdAt', 'DESC'],
            limit: 20,
            // include: [
            //   {
            //     model: Tag,
            //     attributes: ['tag_name'],
            //   },
            // ],
        });
        const monster_posts = dbMonsterPostData.map((posts) =>
            posts.get({ plain: true })
        );
        res.render('homepage', {
            monster_posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});


// TO CHECK When a USER hits LOGIN They are taken to the LOGIN page
router.get('/login', (req, res) => {
    try {
        if (req.session.logged_in) {
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