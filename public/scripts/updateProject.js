const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const Project = require('../../models/project');

async function updateProject(req, res, next) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { ...req.body.project });

    const deletedImageUrls = project.images.filter((_, index) => req.body[`deleteImage${index}`]);
    project.images = project.images.filter((_, index) => !req.body[`deleteImage${index}`]);

    await Promise.all(deletedImageUrls.map(async (url) => {
      const publicId = url.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }))

    if (req.files.length > 0) {
      const uploadedImages = [];
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        uploadedImages.push(result.secure_url);
      }
      project.images = project.images.concat(uploadedImages);
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