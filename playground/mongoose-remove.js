var {ObjectID} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

Todo.remove({}).then((result) => {
  console.log(result);
});

Todo.findByIdAndRemove('5f71cec6b5f4ff3d4c94efda').then((doc) => {
  console.log(doc);
});

Todo.findOneAndRemove({_id: '5f71cec6b5f4ff3d4c94efda'}).then((doc) => {
  console.log(doc);
});
