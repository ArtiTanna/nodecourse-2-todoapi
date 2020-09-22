// var MongoClient = require('mongodb').MongoClient;

var {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log("obj", obj)
// var user = {name: 'arti', age: 25};
// var {name} = user;
// console.log("name",name)

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // db.collection('Todos').insertOne({
  //   text: 'Somthing to do',
  //   completed: false
  // }, (err, res) => {
  //   if(err) {
  //     return console.log('Unable to insert', err);
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2))
  // })

  // db.collection('Users').insertOne({
  //   name: 'Arti',
  //   age: 23,
  //   location: 'Ahmd'
  // }, (err, res) => {
  //   if(err) {
  //     return console.log('Unable to insert', err);
  //   }
  //   console.log(res.ops[0]._id.getTimestamp())
  // })

  db.close();
})
