// const router = require('express').Router();

// router.get('/chamber', (req, res) => {
//   res.send('Hello from /chamber');
// });

// router.post('/chamber', (req, res) => {
//   res.send('Received POST request to /chamber');
// });

// module.exports = router;

const router = require('express').Router();
const { Monster, User } = require('../models/index.js');
// const getAuth = require('../utils/auth.js');

// TO DO This Route GET Summons a Users Monsters to their Home Page
router.get('/', async (req, res ) => {
  try {
    console.log('Entered /chamber GET route');
    const dbMonsterPostData = await Monster.findAll({
        where: { user_id: req.session.user_id }, //TO DO Update the property tag in the where to be the User ID
        // order: [Task, 'createdAt', 'DESC']
      });

    const monster_posts = dbMonsterPostData.map((posts) => {
      posts.get({ plain: true })
    });

    res.render('chamber', { //TO CHECK - Make sure the handlebar tag matches
      monster_posts,
      loggedIn: req.session.loggedIn,
    });

  } catch (err) {
    console.error('Error in /chamber GET route:', err);
    res.status(500).json(err);
  }
});

// TO DO This Route Lets a User POST a New Monster
router.post('/chamber', async (req, res ) => {
  try {
    console.log('Entered /chamber POST route');
    const newMonster = await Monster.create({
      reader_id: req.body.reader_id, //TO CHECK : Remove
    });
    res.status(200).json(newMonster);
    // after new monster creation, redirect to chamber
    res.redirect('/chamber');
  } catch (err) {
    console.error('Error in /chamber POST route:', err);
    res.status(400).json(err);
  }
});
// TO DO This Route Lets a User PUT and UPDATE on a Monster

module.exports = router;