import {Router} from 'express'

const users = ['user0', 'user1', 'user2']

export default new Router()
  .get('/users', (req, res) => {
    res.end(JSON.stringify(users))
  })
  .post('/users', (req, res) => {
    res.end(JSON.stringify(users))
  })
  .delete('/users', (req, res) => {
    res.end(JSON.stringify(users))
  })
