var {ObjectID} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

console.log("Todo--",Todo);
console.log("USer--",User);

var id = "5f6b09c75c160a50335b7f";

var id_user = "5f69fcac0d9e090c11d637b7";

if(!ObjectID.isValid(id)) {
  console.log("ID not valid")
}

Todo.find({
  _id: id
}). then ((todos) => {
  console.log("todos", todos);
});

Todo.findOne({
  _id: id
}). then ((todo) => {
  console.log("todo", todo);
});

Todo.findById(id). then ((todo) => {
  if(!todo) {
    return console.log("Id not exist");
  }
  console.log("todo by id", todo);
}). catch((e) => console.log(e));

User.findById(id_user). then ((user) => {
  if(!user) {
    return console.log("Id not exist");
  }
  console.log("user by id", user);
}). catch((e) => console.log(e));
