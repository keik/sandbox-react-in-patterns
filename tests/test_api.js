import request from 'supertest'
import tape from 'tape'

import main from '../lib/server/app'

let server

tape('setup', t => {
  server = main()
  t.end()
})

let path
tape(`'GET ${ path = '/api/v1/users' }' should return list of users as JSON string`, t => {
  t.plan(1)
  request(server)
    .get(path)
    .expect(200, JSON.stringify(['user0', 'user1', 'user2']))
    .end((err, res) => t.error(err))
})

tape(`'POST ${ path = '/api/v1/users' }' should return list of users as JSON string`, t => {
  t.plan(1)
  request(server)
    .post(path)
    .send({name: '@@@@@@@@@@@@@@@@@@@@@'})
    .expect(200, JSON.stringify(['user0', 'user1', 'user2']))
    .end((err, res) => t.end(err))
})

tape('teardown', t => {
  server.close()
  t.end()
})
