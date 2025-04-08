const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  filename: { 
    type: String, 
    required: true 
  },
  path: { 
    type: String, 
    required: true 
  },
  uploadDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Image', ImageSchema);
