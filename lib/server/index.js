import bodyParser from 'body-parser'
import debug from 'debug'
import express from 'express'
import http from 'http'
import morgan from 'morgan'

import routers from './routers'
import pkg from '../../package.json'
import {getRoutesAsString} from './utils'

const d = debug(`${ pkg.name }:${ __filename }`)

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

routers.forEach(router => app.use(router))
console.log(getRoutesAsString(app))

app.use(express.static('public'))
app.use(express.static('build'))

app.listen(3000, () => {
  d(`listen on port ${ 3000 }`)
})
