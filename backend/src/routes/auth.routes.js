import { Router } from 'express'
// DataBase
import { con } from '../database'

const router = Router()

// Route for add user
router.post('/', (req, res) => {
  const token = req.headers['x-access-token']
  const user = req.body

  // Find if user exists
  con.query('SELECT * FROM users WHERE uid = ' + con.escape(user.uid), (err, result) => {
    if (err) {
      console.log(err)
    } if (result.length === 0) {
      // The user not exits in db, create
      con.query(
        'INSERT INTO users (uid, actual_access_token) VALUES (?,?)',
        [user.uid, token],
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            console.log(result.insertId)
            return res.status(201).send({ message: 'user added succefully' })
          }
        })
    } else {
      con.query(
        'UPDATE users SET actual_access_token = ? WHERE uid = ?',
        [token, user.uid],
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            return res.status(203).send({ message: 'User edit token succefully' })
          }
        })
    }
  })
})

export default router
