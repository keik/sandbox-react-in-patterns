import {Router} from 'express'

const users = ['user0', 'user1']

export default new Router()
  .get('/users', (req, res) => {
    res.end(JSON.stringify(users))
  })
