import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import config from './config'
import appMiddleware from './middleware/appMiddleware'

const app = express()
app.use(cors())
appMiddleware(app)

mongoose.connect(config.db.url)
mongoose.set('useCreateIndex', true)

const api = require('./api')
const graphql = require('./graphql')

app.use('/api', api)
app.use('/graphql', graphql)

module.exports = app
