import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import passport from 'passport'
import bodyParser from 'body-parser'

import api from './api'
import graphql from './graphql'
import config from './config'
import appMiddleware from './middleware/appMiddleware'
import * as strategies from './passport'

const app = express()
app.use(cors())
appMiddleware(app)

mongoose.connect(config.db.url)
mongoose.set('useCreateIndex', true)

passport.use(strategies.local)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', api)
app.use('/graphql', graphql)

export default app
