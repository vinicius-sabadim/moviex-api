import { Router } from 'express'
import * as controller from './genreController'

const router = Router()

router.route('/').get(controller.get)

export default router
