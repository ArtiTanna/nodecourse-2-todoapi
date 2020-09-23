var expect = require('expect');
var request = require('supertest');

var {Todo} = require('./../models/todo');
var {app} = require('./../server');

var todos = [{
  text: "First test"
},
{
  text: "Second test"
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
    .end(done);
  });
})
