const Project = require('../../models/project');
const cloudinary = require('cloudinary').v2;

module.exports = async function createProject(req, res, next) {
    try {
        const project = new Project(req.body.project);
        const uploadedImages = [];
        for (let file of req.files) {
            const result = await cloudinary.uploader.upload(file.path);
            uploadedImages.push(result.secure_url);
        }
        project.images = uploadedImages;
        project.images.sort((a, b) => {
            const regex = /(\d+)/g;
            const aName = a.match(regex)[0];
            const bName = b.match(regex)[0];
            if (a.replace(regex, '') === b.replace(regex, '')) {
                return aName - bName;
            } else {
                return a.localeCompare(b);
            }
        });
        await project.save();
        res.redirect('/projects');
    } catch (err) {
        next(err);
    }
};