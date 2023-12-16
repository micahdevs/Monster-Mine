const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// middleware for drag and drop/file uploads with dropzone
const fileUpload = require('express-fileupload');


const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'YouCantHandleTheTruth',
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// fileUpload middleware
app.use(fileUpload());
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Access the uploaded file directly, field name 'monsterImage'
  const monsterImage = req.files.monsterImage;

  // Check if the file object is valid before using it
  if (!monsterImage) {
    return res.status(400).send('Monster image file is missing.');
  }

  // here for troubleshooting purposes
  console.log('monsterImage:', monsterImage);

  // mv method moves file to a designated location (uploads directory at the root, added to .gitignore)
  monsterImage.mv(`./uploads/${monsterImage.name}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded!');
  });
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
