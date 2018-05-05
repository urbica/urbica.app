const mongoose = require('mongoose');
const { layerSchema } = require('../layer/layer.model');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  // style: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // },
  // sources: {
  //   type: [String],
  //   required: false
  // },
  layers: {
    type: [layerSchema],
    required: false
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = { Project, projectSchema };
