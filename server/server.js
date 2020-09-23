// var {ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

// app.get('/todos', (req, res) => {
//
// });

app.listen(3000, () => {
  console.log("started on port 3000");
});

module.exports = {app};

// var newTodo = new Todo({
//   text: "Cook Dinner"
// });
//
// var newTodo2 = new Todo({
//   text: '   Edit     '
// });
//
// var newUser = new User({
//   email: 'a@a.com'
// })
//
// newUser.save().then((doc) => {
//   console.log("saved user", doc)
// },(e) => {
//   console.log("Unable to save", e)
// })

// newTodo2.save().then((doc) => {
//   console.log("saved to do", doc)
// },(e) => {
//   console.log("Unable to save", e)
// })

// newTodo.save().then((doc) => {
//   console.log("saved to do", doc)
// },(e) => {
//   console.log("Unable to save", e)
// })
