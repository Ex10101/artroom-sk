const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skName: { type: String, required: false},
  description: { type: String, required: false },
  slovakDescription: { type: String, required: false },
  shortDescription: { type: String, required: false },
  shortSkDescription: { type: String, required: false },
  type: { 
    type: String, 
    enum: ['Visualisation', 'Architecture', 'Design'], 
    required: true 
  },
  images: [{type: String}]
});

projectSchema.index({ type: 1 }); 

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

