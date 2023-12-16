const router = require('express').Router();
const { Monster } = require('../models/index.js');

router.post('/', async (req, res) => {
  try {
    if (!req.files || !req.files.monsterImage) {
      return res.status(400).send('No files were uploaded.');
    }

    const monsterImage = req.files.monsterImage;

    // moves uploaded file to the uploads folder
    const imagePath = `./upload/${monsterImage.name}`;
    monsterImage.mv(imagePath, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      // image path saves to the database
      const monster = await Monster.findByPk(req.session.monsterId);
      if (monster) {
        monster.image = imagePath;
        await monster.save();
        res.send('File uploaded!');
      } else {
        res.status(404).send('Monster not found.');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
