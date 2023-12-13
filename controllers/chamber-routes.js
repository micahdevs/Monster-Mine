const router = require('express').Router();
const { BlogPost } = require('../models/index.js'); //TO DO - Update the Model
const getAuth = require('../utils/auth.js')

// TO DO This Route GET Summons a Users Monsters to their Home Page
router.get('/', getAuth, async (req, res ) => {
    try {
        const dbMonsterPostData = await BlogPost.findAll({ //TO DO - Update the Model
             where: {poster_id:req.session.user_id}, //TO DO Update the property tag in the where to be the User ID
             order: [Task, 'createdAt', 'DESC']
         });
     const monster_posts = dbMonsterPostData.map((posts) =>
       posts.get({ plain: true })
     );
     res.render('library', { //TO CHECK - Make sure the handlebar tag matches
         monster_posts,
         loggedIn: req.session.loggedIn,
       });
     } catch (err) {
       console.log(err);
       res.status(500).json(err);
     }
});
// TO DO This Route Lets a User POST a New Monster
router.post('/', getAuth, async (req, res ) => {
    try {} catch {}
});
// TO DO This Route Lets a User PUT and UPDATE on a Monster


module.exports = router;