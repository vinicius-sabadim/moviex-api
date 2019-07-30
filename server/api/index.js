import { Router } from 'express'
import userRoutes from './user/userRoutes'
import movieRoutes from './movie/movieRoutes'
import genreRoutes from './genre/genreRoutes'

const router = Router()
router.use('/user', userRoutes)
router.use('/movies', movieRoutes)
router.use('/genres', genreRoutes)

export default router
