import { User } from '../models'

export const getUserByToken = async (token) => {
  try {
    const user = await User.findOne(
      {
        where: { actual_access_token: token }
      }
    )
    return user
  } catch (error) {
    console.log(error)
  }
}
