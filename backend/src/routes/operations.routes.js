import { Router } from 'express'
// Middlewares
import { verifyToken } from '../middlewares/auth'
// DataBase
import { con } from '../database'

const router = Router()

// Route for create an operation
router.post('/', [verifyToken], (req, res) => {
  const concept = req.body.concept
  const categoryId = req.body.categoryId
  // Only two types !
  const type = req.body.type === 'income' ? 'income' : 'expenditure'
  const amount = req.body.amount
  const date = req.body.date
  const actualUserId = req.actualUserId
  // const token = req.headers['x-access-token']

  // Verify if category exist
  con.query('SELECT * FROM categories WHERE id = ' + con.escape(categoryId), (err, result) => {
    if (err) {
      console.log(err)
    }
    if (result.length === 0) {
      return res.status(415).send({ message: 'The category not found' })
    } else {
      con.query(
        'INSERT INTO operations (concept, type, category_id, amount, date, user_id) VALUES (?,?,?,?,?,?)',
        [concept, type, categoryId, amount, date, actualUserId],
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            return res.status(201).send({ message: 'Operation added succefully' })
          }
        })
    }
  })
})

// Route for get all operations
router.get('/', [verifyToken], (req, res) => {
  const actualUserId = req.actualUserId
  con.query('SELECT operations.*, categories.name AS category  FROM operations INNER JOIN categories ON operations.category_id = categories.id WHERE operations.user_id = ? ORDER BY date DESC', actualUserId, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

// Route for get an operation by id
router.get('/:id', [verifyToken], (req, res) => {
  const id = req.params.id
  const actualUserId = req.actualUserId

  con.query('SELECT * FROM operations WHERE id = ?', id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if (result[0].user_id === actualUserId) return res.status(200).send(result)
      return res.status(413).send({ message: 'actual user not authorization to see this operation' })
    }
  })
})

// Route for edit an operation by id
router.put('/:id', [verifyToken], (req, res) => {
  const id = req.params.id
  const categoryId = req.body.categoryId
  const amount = req.body.amount
  const concept = req.body.concept
  const date = req.body.date
  const userId = req.actualUserId

  con.query(
    'UPDATE operations SET concept = ?, amount = ?, date = ?, category_id = ?, user_id = ? WHERE id = ?',
    [concept, amount, date, categoryId, userId, id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(201).send({ message: 'Operation edited succefully' })
      }
    }
  )
})

// Route for delete an operation by id
router.delete('/:id', [verifyToken], (req, res) => {
  const id = req.params.id
  const userId = req.actualUserId

  con.query('DELETE FROM operations WHERE id = ? AND user_id = ?', [id, userId], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.status(204).send(result)
    }
  })
})

export default router
