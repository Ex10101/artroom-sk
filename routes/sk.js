const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.find({});
        res.render('sk/index', { projects });
    } catch (e) {
        next(e)
    }
});

router.get('/projects', async (req, res, next) => {
    try {
        const architectureProjects = await Project.find({ type: 'Architecture' });
        const visualisationProjects = await Project.find({ type: 'Visualisation' });
        const designProjects = await Project.find({ type: 'Design' });
        const projects = await Project.find({});

        res.render('sk/projects', {
            architectureProjects,
            visualisationProjects,
            designProjects,
            projects
        });
    } catch (err) {
        next(err);
    }
});

router.get('/projects/:id', async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        res.render('sk/projects/show', { project });
    } catch (err) {
        next(err);
    }
});

router.get('/prices', (req, res) => {
    res.render('sk/prices');
});

router.get('/about', (req, res) => {
    res.render('sk/about');
})

router.get('/contacts', (req, res) => {
    res.render('sk/contacts');
})

module.exports = router;