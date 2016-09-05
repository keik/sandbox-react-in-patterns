import {Router} from 'express'

const users = ['user0', 'user1', 'user2']

export default new Router()
  .use('/users', (req, res) => {
    res.end(JSON.stringify(users))
  })
