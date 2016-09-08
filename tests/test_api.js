import tape from 'tape'
import apiRouters from '../lib/server/routers/api/'

import express from 'express'
import request from 'supertest'

const app = express()
app.use(apiRouters[0])

let path
tape(`'GET ${ path = '/api/v1/users' }' should return list of users as JSON string`, t => {
  t.plan(1)

  request(app)
    .get(path)
    .expect(200, JSON.stringify(['user0', 'user1', 'user2']))
    .end((err, res) => t.error(err))
})
