import {Router} from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'

import postsRouter from './posts'
import usersRouter from './users'
import {renderFullPage} from '../utils'
import App from '../../components/app'

const indexRouter = new Router()
        .get('/', (req, res) => {
          const appHTML = renderToString(React.createElement(App)),
                fullHTML = renderFullPage(appHTML, {}, 'app')
          res.end(fullHTML)
        })

export default [indexRouter, postsRouter, usersRouter]
