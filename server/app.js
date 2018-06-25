const express = require('express')
const config = require('./config')
const app = express()

require('mongoose').connect(config.db.url)
require('./middleware/appMiddleware')(app)

const api = require('./api')
const graphql = require('./graphql')

app.use('/api', api)
app.use('/graphql', graphql)

module.exports = app