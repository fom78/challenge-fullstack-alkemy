// DataBase
import { con } from '../database'

// Simple verify for didactical use.... if token is in db, add the user id in request
export const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) return res.status(403).json({ message: 'No token provided' })

  // verify user exist and token is valid
  con.query('SELECT * FROM users WHERE actual_access_token = ' + con.escape(token), (err, result) => {
    if (err) {
      console.log(err)
    } if (result.length === 0) {
      // The token not exits in db, error in access
      return res.status(413).send({ message: 'The token is bad' })
    }
    // the token exists, get uer id.
    console.log('####### Vamos bien #######')
    const actualUserId = result[0].id
    req.actualUserId = actualUserId
    next()
  })
}
