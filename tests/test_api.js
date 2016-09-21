import request from 'supertest'
import tape from 'tape'

import app from '../lib/server/app'

const path = '/api/v1/users'
tape(`'GET ${ path }' should return list of users as JSON string`, t => {
  request(app)
    .get(path)
    .expect(200)
    .end((err, res) => {
      t.error(err, 'no error')
      t.end()
    })
})

tape(`'POST ${ path }' with valid JSON should create new user`, t => {
  const r = request(app)
  Promise.resolve().then(() => {
    return new Promise((resolve, reject) => {
      r.get(path)
        .end((err, res) => {
          t.error(err, 'no error')
          resolve(res)
        })
    })
  }).then(res => {
    return new Promise((resolve, reject) => {
      const len = res.body.length
      r.post(path)
        .send({name: 'foo'})
        .expect(201)
        .end((err, res) => {
          t.error(err, 'no error')
          resolve(len, res)
        })
    })
  }).then((len, res) => {
    return new Promise((resolve, reject) => {
      r.get(path)
        .expect(200)
        .end((err, res) => {
          t.error(err, 'no error')
          t.equal(res.body.length, len + 1)
          resolve()
        })
    })
  }).then(() => t.end())
})

tape(`'POST ${ path }' with invalid JSON should not create new user`, t => {
  const r = request(app)
  Promise.resolve().then(() => {
    return new Promise((resolve, reject) => {
      r.get(path)
        .end((err, res) => {
          t.error(err, 'no error')
          resolve(res)
        })
    })
  }).then(res => {
    return new Promise((resolve, reject) => {
      const len = res.body.length
      r.post(path)
        .send({ /* empty */ })
        .expect(400)
        .end((err, res) => {
          t.error(err, 'no error')
          resolve(len, res)
        })
    })
  }).then((len, res) => {
    return new Promise((resolve, reject) => {
      r.get(path)
        .expect(200)
        .end((err, res) => {
          t.error(err, 'no error')
          t.equal(res.body.length, len)
          resolve()
        })
    })
  }).then(() => t.end())
})

tape(`'DELETE ${ path }/:name' should delete specified user`, t => {
  const r = request(app)
  new Promise((resolve, reject) => {
    r.delete(`${ path }/user0`)
      .expect(200)
      .end((err, res) => {
        t.error(err, 'no error')
        resolve(res)
      })
  }).then(res => {
    r.delete(`${ path }/bar`)
      .expect(404)
      .end((err, res) => {
        t.error(err, 'no error')
        t.end()
      })
  })
})
