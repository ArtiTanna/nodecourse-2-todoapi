
var {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // db.collection('Todos').find({
  //   _id: new ObjectID ('5f69dae27ea0d12d34ad3cc3')
  // }).toArray().then((doc) => {
  //   console.log("Todos--");
  //   console.log(JSON.stringify(doc, undefined, 2))
  // }, (err) => {
  //   console.log("Unable to fetch", err);
  // });

  db.collection('Todos').find().count().then((count) => {
    console.log("Todos count", count);
    // console.log(JSON.stringify(doc, undefined, 2))
  }, (err) => {
    console.log("Unable to fetch", err);
  });

  db.collection('Users').find({
    name: 'Arti'
  }).toArray().then((doc) => {
    console.log("Users --", JSON.stringify(doc, undefined, 2));
  }, (err) => {
    console.log("Unable to fetch", err);
  });

  //db.close();
})
