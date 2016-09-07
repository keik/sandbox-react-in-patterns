import tape from 'tape'
import {getRoutesAsString} from '../lib/server/utils'

import express, {Router} from 'express'

tape(`'${ getRoutesAsString.name }' should return all routes as pretty string`, t => {
  const app = express()
  app.use(
    new Router()
      .get('/', () => {})
      .get('/users', () => {})
      .post('/users', () => {})
      .put('/users', () => {})
      .delete('/users', () => {}))

  const expected = ['GET   : /',
                    'GET   : /users',
                    'POST  : /users',
                    'PUT   : /users',
                    'DELETE: /users',
                    ''].join('\n')

  t.equal(getRoutesAsString(app), expected)
  t.end()
})
