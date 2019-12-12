const mongoose = require('mongoose');

/* Create schema */
var schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 1,
    max: 20
  },
  text: {
    type: String,
    required: true,
    min: 1,
    max: 100
  },
  created: {
    type: Date,
    required: true
  }
});

/* Set up model */
var Posts = mongoose.model('posts', schema);

module.exports = Posts;
