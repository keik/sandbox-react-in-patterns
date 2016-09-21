import bodyParser from 'body-parser'
import debug from 'debug'
import express from 'express'
import http from 'http'
import morgan from 'morgan'

import routers from './routers'
import apiRouters from './routers/api'

import pkg from '../../package.json'
import {getRoutesAsString} from './utils'

const d = debug(`${ pkg.name }:${ __filename }`)

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

routers.concat(apiRouters).forEach(router => app.use(router))

d('add routers for...\n' + getRoutesAsString(app))

app.use(express.static('public'))
app.use(express.static('build/assets'))

export default app
