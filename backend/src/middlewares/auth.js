// Libs
import { getUserByToken } from '../libs/user'

// Simple verify for didactical use.... if token is in db, add the user id in request
export const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) return res.status(403).json({ message: 'No token provided' })

  // verify user exist and token is valid
  const user = await getUserByToken(token)
  if (user === null) return res.status(403).json({ message: 'Perhaps token expired' })

  // the token exists, get user id.
  req.body.actualUserId = user.id

  next()
}
