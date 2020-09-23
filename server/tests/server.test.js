var expect = require('expect');
var request = require('supertest');

var {Todo} = require('./../models/todo');
var {app} = require('./../server');

beforeEach((done) => {
  Todo.remove({}).then(() => done());
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

      Todo.find().then((todos) => {
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
        expect(todos.length).toBe(0);
        done();
      }).catch((e) => done(e));
    })
  })
})
