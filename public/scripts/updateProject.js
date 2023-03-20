const path = require('path');
const fs = require('fs');

const Project = require('../../models/project');

async function updateProject(req, res, next) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { ...req.body.project });

    const deletedImages = project.images.filter((_, index) => req.body[`deleteImage${index}`]);
    project.images = project.images.filter((_, index) => !req.body[`deleteImage${index}`]);

    deletedImages.forEach(image => {
        const imagePath = path.join(__dirname, '..', 'uploads', image);
      fs.unlinkSync(imagePath);
    });

    if (req.files.length > 0) {
      project.images = project.images.concat(req.files.map(f => (f.filename)));
    }

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
  } catch (e) {
    next(e)
  }
}

module.exports = updateProject;