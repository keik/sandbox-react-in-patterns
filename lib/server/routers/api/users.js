import {Router} from 'express'

const users = ['user0', 'user1', 'user2']

export default new Router()
  .get('/api/v1/users', (req, res) => {
    res.end(JSON.stringify(users))
  })
  .post('/api/v1/users', (req, res) => {
    res.end(JSON.stringify(users))
  })
  .delete('/api/v1/users', (req, res) => {
    res.end(JSON.stringify(users))
  })
