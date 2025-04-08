// === Picture Gallery App ===

const express = require('express');
const multer = require('multer');
const path = require('path');
const Image = require('./models/Image.js');
 require('./config/connection.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Multer storage config
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({storage});

// Middleware
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadDate: -1 });
    res.render('index', { images });
  } catch {
    res.status(500).send('Error loading images');
  }
});

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  const { filename, path } = req.file;
  try {
    await Image({
      filename,
      path,
      uploadDate: new Date()
    }).save();
    res.redirect('/');
  } catch {
    res.status(500).send('Error saving image');
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
