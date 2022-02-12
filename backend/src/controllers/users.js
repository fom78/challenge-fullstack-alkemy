import { User } from '../models'

export const saveUser = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    const { uid } = req.body.user

    const userFound = await User.findOne(
      {
        where: { uid }
      }
    )
    if (userFound === null) {
      // User not exist, create new
      await User.create(
        {
          uid,
          actual_access_token: token
        }
      )
      return res.status(201).send({ message: 'user added succefully' })
    } else {
      // User exist, update access token
      await User.update(
        {
          actual_access_token: token
        },
        {
          where:
                  { uid }
        })
      return res.status(203).send({ message: 'User edit token succefully' })
    }
  } catch (error) {
    console.log(error)
  }
}
