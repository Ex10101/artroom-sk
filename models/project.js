const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  // type: { 
  //   type: String, 
  //   enum: ['Visualisation', 'Architecture', 'Design'], // Accepts only 1 option out of these 3
  //   required: true 
  // },
  images: [{type: String}]
});

projectSchema.index({ type: 1 }); // In case of sorting by type this will improve the performance

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

