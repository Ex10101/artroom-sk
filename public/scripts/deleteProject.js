const Project = require('../../models/project');
const path = require('path');
const fs = require('fs');

module.exports = async function deleteProjects(req, res, next) {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            res.status(404).send('Project not found');
            return;
        }

        deletedProject.images.forEach((filename) => {
            const imagePath = path.join(__dirname, '..', 'uploads', filename);
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
};
