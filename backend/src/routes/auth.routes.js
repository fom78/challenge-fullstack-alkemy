import { Router } from 'express'
// Controller
import { loginUser, saveUser } from '../controllers/users'

const router = Router()

// Add user
router.post('/', saveUser)

// Login user
router.post('/login', loginUser)

export default router
