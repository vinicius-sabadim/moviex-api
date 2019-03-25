import { Router } from 'express'
import movieRoutes from './movie/movieRoutes'

const router = Router()
router.use('/movies', movieRoutes)

export default router
