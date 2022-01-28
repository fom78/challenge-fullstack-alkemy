import { Router } from 'express'
// DataBase
import { con } from '../database'

const router = Router()

// Route for get all categories
router.get('/', (req, res) => {
  con.query('SELECT * FROM categories ORDER BY name DESC', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

export default router
