import { Router } from 'express'
import authRoutes from './auth/authRoutes'
import movieRoutes from './movie/movieRoutes'

const router = Router()
router.use('/auth', authRoutes)
router.use('/movies', movieRoutes)

export default router
