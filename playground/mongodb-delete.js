
var {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  //deleteMany

  // db.collection('Todos').deleteMany({text: "Eat Lunch"}).then((res) => {
  //   console.log(res);
  // });

  //deleteOne

  // db.collection('Todos').deleteOne({text: "test"}).then((res) => {
  //   console.log(res);
  // });

  //findOneAndDelete

  // db.collection('Todos').findOneAndDelete({completed: true}).then((res) => {
  //   console.log(res);
  // });

  //deleteMany

  // db.collection('Users').deleteMany({name: "Arti"}).then((res) => {
  //   console.log(res);
  // });

  //findOneAndDelete

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5f69ef58893de636c2b33c46')}).then((res) => {
    console.log(res);
  });

  //db.close();
})
