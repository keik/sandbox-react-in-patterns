import {Router} from 'express'

const posts = ['post0', 'post1', 'post2']

export default new Router()
  .get('/posts', (req, res) => {
    res.end(JSON.stringify(posts))
  })
