import { Router } from 'express'
// Controllers
import { getCategories } from '../controllers/categories'

const router = Router()

// Get all categories
router.get('/', getCategories)

export default router
