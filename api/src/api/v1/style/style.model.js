const mongoose = require('mongoose');

const styleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const Style = mongoose.model('Style', styleSchema);

module.exports = { Style, styleSchema };
