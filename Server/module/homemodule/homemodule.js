// const mongoose = require('mongoose');

// const homeSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     // unique: true
//   },
//   description: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   image: {
//     type: String,
//     required: true
//   }
// }, { timestamps: true });

// // 👇 VERY IMPORTANT
// module.exports = mongoose.model('home', homeSchema);


const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is aaaaaaaarequired'],
    trim: true,
    // unique: true   // ← usually NOT unique for home content
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  image: {
    type: String,
    // required: [true, 'Image is required'],
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Home', homeSchema);
// ↑ Better to use PascalCase for model name → 'Home'