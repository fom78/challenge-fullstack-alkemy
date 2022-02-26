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

export const getUserByUid = async (uid) => {
  try {
    const user = await User.findOne(
      {
        where: { uid }
      }
    )
    return user
  } catch (error) {
    console.log(error)
  }
}

export const getUserById = async (id) => {
  try {
    const user = await User.findOne(
      {
        where: { id }
      }
    )
    return user
  } catch (error) {
    console.log(error)
  }
}
