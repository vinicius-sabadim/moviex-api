import { Router } from 'express'
import userRoutes from './user/userRoutes'
import movieRoutes from './movie/movieRoutes'

const router = Router()
router.use('/user', userRoutes)
router.use('/movies', movieRoutes)

export default router
