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


// TO DO This Route Lets a User POST a New Monster
router.post('/', (req, res ) => {
  console.log('MONSTER CREATE ROUTE HIT');
  // try {

  //   const monsterData = req.body;
  //   const newMonster = await Monster.create(monsterData);
  //   res.status(201).json(newMonster);
  // } catch (err) {
  //   // Handle errors
  //   console.error(err);
  //   console.log(req.body)
  //   res.status(500).json({ error: 'Internal Server Error' });
  // }
});

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


module.exports = router;