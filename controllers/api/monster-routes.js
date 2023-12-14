// TO DO. This route summons a monster when clicked on the home page
const router = require('express').Router();

//TO DO - Update the Model
const { Monster } = require('../../models/index.js');

router.get('/:id', async (req, res) => {
    try {
      const dbMonsterData = await Monster.findByPk(req.params.id); //TO DO Update the property tag in the where to be the User ID
      const monster = dbMonsterData.get({ plain: true });
      res.render('monster-detail-sheet', { //TO CHECK - Make sure the handlebar tag matches
        monster,
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