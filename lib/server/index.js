const bodyParser = require('body-parser'),
      debug = require('debug'),
      express = require('express'),
      http = require('http'),
      morgan = require('morgan')

const pkg = require('../../package.json')

const d = debug(`${ pkg.name }:${ __filename }`)

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('public'))
app.use(express.static('build'))

app.listen(3000, (a,b,c) => {
  d(`listen on port ${ 3000 }`)
})
