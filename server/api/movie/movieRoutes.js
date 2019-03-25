import { Router } from 'express'
import * as controller from './movieController'

const router = Router()

router.param('id', controller.param)

router
  .route('/')
  .get(controller.get)
  .post(controller.post)

router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.deleteMovie)

export default router
