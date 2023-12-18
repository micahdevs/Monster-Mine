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
      const dbMonsterData = await Monster.findAll({ //TO DO - Update the Model
        where: { user_id: req.session.user_id },
          //order: ['createdAt', 'DESC'],
        limit: 20,
      });
      const monster = dbMonsterData.map((posts) =>
          posts.get({ plain: true })
      );
      //console.log(monster_posts);
      res.render('Chamber', {
          monster,
          loggedIn: req.session.loggedIn,
      });
    
      console.log(monster);
      
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  };
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