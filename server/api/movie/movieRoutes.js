import { Router } from 'express'
import * as controller from './movieController'
import auth from '../auth'

const router = Router()

router.param('id', controller.param)

router
  .route('/')
  .get(auth.required, controller.get)
  .post(controller.post)

router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.deleteMovie)

router.route('/genres/:genre').get(controller.getMoviesByGenre)

export default router
