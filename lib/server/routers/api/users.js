import {Router} from 'express'

let users = ['user0', 'user1', 'user2']

export default new Router()
  .get('/api/v1/users', (req, res) => {
    res.status(200).json(users)
  })
  .post('/api/v1/users', (req, res) => {
    const body = req.body
    if (body.name == null) {
      res.status(400).end('"name" field is required')
      return
    }
    users.push(body.name)
    res.status(201).end(`new user was created`)
  })
  .delete('/api/v1/users/:name', (req, res) => {
    const name = req.params.name
    if (!users.some(user => user == name)) {
      res.status(404).end('not found specified user')
      return
    }
    users = users.filter(user => user !== req.params.name)
    res.status(200).end('user was deleted')
  })
