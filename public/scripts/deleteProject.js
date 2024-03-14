const Project = require('../../models/project');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

module.exports = async function deleteProjects(req, res, next) {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            res.status(404).send('Project not found');
            return;
        }

        await Promise.all(deletedProject.images.map(async (url) => {
            const publicId = url.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(publicId);
        }));

        res.redirect('/projects');
    } catch (err) {
        next(err);
    }
};
