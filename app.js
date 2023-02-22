const express = require('express');
const app = express();
const dbUrl = 'mongodb://127.0.0.1:27017/artroom';
const mongoose = require('mongoose');
const Project = require('./models/project');

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

mongoose.connect(dbUrl)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error(`Error connecting to database: ${err}`);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

