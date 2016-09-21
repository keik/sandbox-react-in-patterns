import app from './app'
import debug from 'debug'

import config from '../../config'
import pkg from '../../package.json'

const d = debug(`${ pkg.name }:${ __filename }`)

app.listen(config.PORT, () => {
  d(`listen on port ${ config.PORT }`)
})
