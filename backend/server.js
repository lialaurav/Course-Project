const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Posts = require('./models/post.js');

app.use(bodyParser.json());
app.use(cors());

/* Connect to database */
var mongoDB = 'mongodb+srv://username:password@cluster0-idikr.mongodb.net/assignment?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.once('open', () => (console.log('MongoDB is connected')));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* If server gets a GET request, fetch data from database */
app.get('/', (req, res) => {
  Posts.find({}, null, {sort: {created: -1}}, function(err, posts) {
    if (err)
    return console.error(err)
    res.json(posts)
  })
});

app.get('/:id', (req, res) => {
  Posts.find({username: req.params.id}, null, {sort: {created: -1}}, function(err, posts) {
    if (err)
    return console.error(err)
    res.json(posts)
  })
});

/* If server gets a POST request, save a new post to database */
app.post('/add', (req, res) => {
  var post = new Posts ({
    username: req.body.username,
    text: req.body.text,
    created: new Date()
  });
  post.save(function(err) {
    if (err)
    return console.log(err)
    res.json("New post successfully saved to database")
  })
});

/* Set up server */
app.listen(5000);
console.log('Server is up and running at localhost:5000');
