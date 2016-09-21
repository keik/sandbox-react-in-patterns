import express, {Router} from 'express'
import tape from 'tape'

import {getRoutesAsString, renderFullPage} from '../lib/server/utils'

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

tape(`'${ renderFullPage.name }' should return full page as HTML string`, t => {
  const fullHTML = renderFullPage('<p>foo</p>', {a: 1}, 'bar')
  t.ok(fullHTML.match('bar.css'))
  t.ok(fullHTML.match('bar.js'))
  t.ok(fullHTML.match('APP_PROPS = {"a":1}'))
  t.ok(fullHTML.match('<p>foo</p>'))
  t.end()
})
