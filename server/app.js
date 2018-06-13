const express = require('express')
const app = express()

require('./middleware/appMiddleware')(app)

const api = require('./api')
const graphql = require('./graphql')

app.use('/api', api)
app.use('/graphql', graphql)

module.exports = app