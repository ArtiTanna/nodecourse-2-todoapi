

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var _ = require('underscore');

var config = require('./config/config');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.find({_id: new ObjectID(id)}).then((todos) => {
    if(todos)
      return res.send({todos});
    else
      return {};
  }, (e) => {
    res.status(400).send(e);
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove({_id: new ObjectID(id)}).then((todos) => {
    if(todos)
      return res.send({todos});
    else
      return res.status(404).send();
  }, (e) => {
    res.status(400).send(e);
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {
    $set: body
  },{
    new: true
  }).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e) => {
    res.status(400).send();
  })
})

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email','password']);
  // var user = new User({
  //   email: body.email,
  //   password: body.password
  // });

  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
    //res.send(user);
  }).then ((token) => {
    res.header({'x-auth': token}).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`started on port ${port}`);
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
