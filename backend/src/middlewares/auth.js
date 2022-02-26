// Libs
import { getUserByToken, getUserById } from '../libs/user'

// Simple verify for didactical use.... if token is in db, add the user id in request
export const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) return res.status(403).json({ message: 'No token provided' })

  // verify user exist and token is valid
  const user = await getUserByToken(token)
  if (user === null) return res.status(404).json({ message: 'User not exist' })
  if (user && user.actual_access_token !== token) return res.status(402).json({ message: 'Perhaps token expired' })

  // the token exists, get user id.
  req.body.actualUserId = user.id

  next()
}

// Verify is Admin
export const isAdmin = async (req, res, next) => {
  console.log(req.body.actualUserId)
  // // verify user exist and token is valid
  const user = await getUserById(req.body.actualUserId)
  console.log(user.rol, ' es admin')
  if (user && user.rol === 'admin') {
    next()
  } else {
    return res.status(406).json({ message: 'The user nor have admin privilegies' })
  }
}
