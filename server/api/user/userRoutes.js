import { Router } from 'express'
import * as controller from './userController'
import auth from '../auth'

const router = Router()

router.post('/login', auth.optional, controller.login)
router.post('/signup', auth.optional, controller.signup)

export default router
