const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  projects: [{
    type: String
  }],
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'Tools'],
  },
});

module.exports = mongoose.model('Skill', skillSchema);

