import { User } from '../models'

export const saveUser = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    const { uid } = req.body

    const userFound = await User.findOne(
      {
        where: { uid }
      }
    )
    console.log('Encontrado', userFound)
    if (userFound === null) {
      // User not exist, create new
      const userNew = {
        uid,
        rol: 'user',
        actual_access_token: token
      }
      await User.create(userNew)
      return res.status(201).send({ message: 'user added succefully', user: userNew })
    } else {
      // User exist, update access token
      await User.update(
        {
          actual_access_token: token
        },
        {
          where: { uid }
        })
      return res.status(203).send({ message: 'User edit token succefully, googleLogin', user: { ...userFound.dataValues, actual_access_token: token } })
    }
  } catch (error) {
    console.log(error)
  }
  next()
}
