import { Router } from 'express'
// Controllers
import { saveCategory, getCategories, editCategory } from '../controllers/categories'
// Middlewares
import { isAdmin, verifyToken } from '../middlewares/auth'

const router = Router()

// add a category
router.post('/', [verifyToken], saveCategory)

// Get all categories
router.get('/', getCategories)

// Edit a category by id
router.put('/:id', [verifyToken, isAdmin], editCategory)

export default router
