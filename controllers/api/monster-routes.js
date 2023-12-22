// TO DO. This route summons a monster when clicked on the home page
const router = require('express').Router();

const { Monster } = require('../../models/index.js');

// This Route Lets a User POST a New Monster
router.post('/create', async (req, res ) => {
  console.log('MONSTER CREATE ROUTE HIT');
  //console.log(req.body)
  try {
    const monsterData = req.body;
    monsterData.user_id = req.session.user_id;

    console.log("Before Create - monsterData", monsterData);

    const newMonster = await Monster.create(monsterData);
    res.status(201).json(newMonster);

  } catch (err) {
    console.error(err);
    console.log(req.body)
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
router.get('/new', async (req,res) => {
  // userID= req.session.user_id
  try {
    
    res.render('monster-create-page', {loggedIn: req.session.loggedIn, })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
    try {
      const dbMonsterData = await Monster.findByPk(req.params.id); //TO DO Update the property tag in the where to be the User ID
      const monster = dbMonsterData.get({ plain: true });
      const is_owner = async (req) => {
        if (req.session.user_id === monster.user_id) {
          return true
        } else {
            return false
        }
      }
      const owner = await is_owner(req)
      //res.send(monster);
      res.render('monster-detail-sheet', { //TO CHECK - Make sure the handlebar tag matches
        monster, loggedIn: req.session.loggedIn, ownership: owner
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
  try {
      const monsterId = req.params.id;
      const monster_to_delete = await Monster.findOne({ where: { id: monsterId} });
      const deletedMonster = async (req) => {
        if (req.session.user_id === monster_to_delete.user_id) {
          await Monster.destroy({
            where: {
                id: monsterId
            }
          });
      } else {
          return res.redirect('/')
      }
    };
      if (deletedMonster(req)) {
          res.status(200).json({ message: 'Monster deleted successfully' });
      } else {
          res.status(404).json({ error: 'Permission Denied' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;