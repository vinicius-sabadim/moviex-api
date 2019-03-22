import express from 'express'
import cors from 'cors'

import config from './config'

const app = express()
app.use(cors())

require('mongoose').connect(config.db.url)
require('./middleware/appMiddleware')(app)

const api = require('./api')
const graphql = require('./graphql')

app.use('/api', api)
app.use('/graphql', graphql)

module.exports = app
