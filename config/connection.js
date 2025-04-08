const mongoose = require('mongoose');

// MongoDB connection
   mongoose.connect('mongodb://127.0.0.1:27017/picture_gallery')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));