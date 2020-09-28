var expect = require('expect');
var request = require('supertest');
var {ObjectID} = require('mongodb');

var {Todo} = require('./../models/todo');
var {app} = require('./../server');

var todos = [{
  text: "First test",
  _id: new ObjectID(),
},
{
  text: "Second test",
  _id: new ObjectID(),
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos).then(() => done());
  });
});

describe('post /todos', () => {
  it('should create a new Todo', (done) => {
    var text = "Test todo text";

    request(app).post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    })
  })

  it('should not create a new Todo', (done) => {

    request(app).post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    })
  })
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app).get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    });
    done();
  });
})

describe('GET /todos:id', () => {
  it('should return todo doc', (done) => {
    request(app).get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.text).toBe(todos[0].text);
    });
    done();
  });

  it('should return 404', (done) => {
    request(app).get(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    done();
  });

  it('should return 404', (done) => {
    request(app).get(`/todos/${new ObjectID(123)}`)
    .expect(404)
    done();
  });

});

describe('DELETE /todos/:id',() => {

  it('should remove todo doc', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app).delete(`/todos/${hexId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todos._id).toBe(hexId);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Todo.findById(hexId).then((todos) => {
        expect(todos).toNotExist();
        done();
      }).catch((e) => done(e));
    })
  });

  it('should return 404', (done) => {
    request(app).delete(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    done();
  });

  it('should return 404', (done) => {
    request(app).delete(`/todos/${new ObjectID(123)}`)
    .expect(404)
    done();
  });
})
