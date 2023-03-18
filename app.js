if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Project = require('./models/project');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('./middleware/auth');
const helmet = require("helmet");
const session = require('express-session');
const slovakRoutes = require('./routes/sk');
const dbUrl = process.env.DB_URL;
const MongoStore = require('connect-mongo');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
      secret: 'skibidiyes'
  }
});

app.use(session({
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use('/sk', slovakRoutes);

app.set('view engine', 'ejs');


// Connection
mongoose.connect(dbUrl)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error(`Error connecting to database: ${err}`);
  });

const port = process.env.PORT || 3000;



// Configuration
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find({});
    res.render('index', { projects });
  } catch (e) {
    next(e)
  }
});

app.get('/projects', async (req, res, next) => {
  try {
    const architectureProjects = await Project.find({ type: 'Architecture' });
    const visualisationProjects = await Project.find({ type: 'Visualisation' });
    const designProjects = await Project.find({ type: 'Design' });
    const projects = await Project.find({});

    res.render('projects', {
      architectureProjects,
      visualisationProjects,
      designProjects,
      projects
    });
  } catch (err) {
    next(err);
  }
});

app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (auth.authenticateAdmin(username, password)) {
    req.session.admin = true;
    res.redirect('/admin');
  } else {
    res.send('Wrong password or username');
  }
})

app.get('/logout', (req, res) => {
  req.session.admin = false;
  res.redirect('/'); //redirect to the previous page
})

app.get('/admin', auth.requireAdmin, (req, res) => {
  res.render('admin');
})


app.post('/projects', auth.requireAdmin, upload.array('images'), (req, res) => {
  const project = new Project(req.body.project);
  project.images = req.files.map(f => (f.filename));
  project.save()
    .then(() => res.redirect('/projects'))
    .catch(error => console.error(error));
});

app.get('/projects/new', auth.requireAdmin, (req, res) => {
  res.render('projects/new');
})

app.get('/projects/:id', async (req, res, next) => {
  try {
    const admin = req.session.admin;
    const project = await Project.findById(req.params.id);
    res.render('projects/show', { project, admin });
  } catch (err) {
    next(err);
  }
})

app.get('/projects/:id/edit', auth.requireAdmin, async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    res.render('projects/edit', { project })
  } catch (e) {
    next(e)
  }
})

app.post('/projects/:id/update', auth.requireAdmin, upload.array('images'), async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { ...req.body.project });
    project.images = req.files.map(f => (f.filename));
    await project.save();
    res.redirect('/projects');
  } catch (e) {
    next(e)
  }
})

app.post('/projects/:id/delete', auth.requireAdmin, async (req, res, next) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      res.status(404).send('Project not found');
      return;
    }

    deletedProject.images.forEach((filename) => {
      const imagePath = path.join(__dirname, 'public', 'uploads', filename);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });

    res.redirect('/projects');
  } catch (err) {
    next(err);
  }
});

app.get('/prices', (req, res) => {
  res.render('prices');
});

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/contacts', (req, res) => {
  res.render('contacts');
})

app.all('*', (req, res) => {
  res.render('error404');
})

app.use((err, req, res, next) => {
  res.render('error');
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

