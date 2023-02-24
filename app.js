const express = require('express');
const app = express();
const dbUrl = 'mongodb://127.0.0.1:27017/artroom';
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Project = require('./models/project');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

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



// Project CRUD
app.get('/projects', async (req, res) => {
  const projects = await Project.find({});
  res.render('projects/index', { projects });
})


app.get('/projects/new', (req, res) => {
  res.render('projects/new');
})

app.post('/projects', upload.array('images'), (req, res) => {
  const project = new Project(req.body.project);
  project.images = req.files.map(f => (f.filename));
  project.save()
    .then(() => res.redirect('/projects'))
    .catch(error => console.error(error));
});

app.get('/projects/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('projects/show', { project });
})

app.get('/projects/:id/edit', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.render('projects/edit', { project })
})
app.post('/projects/:id/update', async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, { ...req.body.project });
  await project.save();
  res.redirect('/projects');
})

app.post('/projects/:id/delete', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    res.redirect('/projects');
  } catch (err) {
    console.error(err);
    res.redirect('/projects');
  }
});


app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

