
var {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  if(err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5f69f089893de636c2b33cf6')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // },{
  //   returnOriginal: false
  // }).then((res) => {
  //   console.log(res);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5f69ef69893de636c2b33c5b')
  }, {
    $set: {
      name: 'AT'
    },
    $inc: {
      age: 1
    }
  },{
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  });

  //db.close();
})
