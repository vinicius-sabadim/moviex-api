import { Router } from 'express'
import * as controller from './authController'
import jwt from 'express-jwt'

const getTokenFromHeaders = req => {
  const {
    headers: { authorization }
  } = req

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1]
  }
  return null
}

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
}

const router = Router()

router.post('/login', auth.optional, controller.post)

export default router
