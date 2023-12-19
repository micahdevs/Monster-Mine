// TO DO. This route summons a monster when clicked on the home page
const router = require('express').Router();

//TO DO - Update the Model
const { Monster } = require('../../models/index.js');





// TO DO This Route Lets a User POST a New Monster
router.post('/create', async (req, res ) => {
  console.log('MONSTER CREATE ROUTE HIT');
  console.log(req.body)
  try {

    const monsterData = req.body;
    const newMonster = await Monster.create(monsterData);
    res.status(201).json(newMonster);
  } catch (err) {
    // Handle errors
    console.error(err);
    console.log(req.body)
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 

router.get('/new', async (req,res) => {
  try {
    res.render('monster-create-page', {loggedIn: req.session.loggedIn, userID: req.session.user_id})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
    try {
      const dbMonsterData = await Monster.findByPk(req.params.id); //TO DO Update the property tag in the where to be the User ID
      const monster = dbMonsterData.get({ plain: true });
      res.render('monster-detail-sheet', { //TO CHECK - Make sure the handlebar tag matches
        monster, loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.put('/:id', async (req, res ) => {
    try {} catch {}
});
// TO DO This Route Lets a User DELETE a Monster
router.delete('/:id', async (req, res ) => {
    try {} catch {}
});


module.exports = router;