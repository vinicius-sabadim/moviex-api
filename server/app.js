import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import passport from 'passport'
import bodyParser from 'body-parser'

import api from './api'
import graphql from './graphql'
import config from './config'
import * as strategies from './passport'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(config.db.url)
mongoose.set('useCreateIndex', true)

passport.use(strategies.local)

app.use('/api', api)
app.use('/graphql', graphql)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    })
  }
})

export default app
