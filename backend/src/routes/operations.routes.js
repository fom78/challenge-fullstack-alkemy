import { Router } from 'express'
// Controllers
import { editOperation, deleteOperation, getOperation, getOperations, saveOperation } from '../controllers/operations'
// Middlewares
import { verifyToken } from '../middlewares/auth'

const router = Router()

// add an operation
router.post('/', [verifyToken], saveOperation)

// Get all operations
router.get('/', [verifyToken], getOperations)

// Get an operation by id
router.get('/:id', [verifyToken], getOperation)

// Edit an operation by id
router.put('/:id', [verifyToken], editOperation)

// Delete an operation by id
router.delete('/:id', [verifyToken], deleteOperation)

export default router
