const mongoose = require('mongoose');

const layerSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      // index: true,
      // unique: true,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    metadata: {
      name: {
        type: String,
        required: true
      }
    },
    source: {
      type: String,
      required: true
    },
    'source-layer': {
      type: String,
      required: true
    },
    minzoom: Number,
    maxzoom: Number,
    filter: {
      type: Array,
      default: undefined
    },
    layout: Object,
    paint: Object
  },
  { _id: false }
);

const Layer = mongoose.model('Layer', layerSchema);

module.exports = { Layer, layerSchema };
