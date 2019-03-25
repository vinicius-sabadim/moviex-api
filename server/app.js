import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import api from './api'
import graphql from './graphql'
import config from './config'
import appMiddleware from './middleware/appMiddleware'

const app = express()
app.use(cors())
appMiddleware(app)

mongoose.connect(config.db.url)
mongoose.set('useCreateIndex', true)

app.use('/api', api)
app.use('/graphql', graphql)

export default app
