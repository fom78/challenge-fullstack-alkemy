import { Category } from '../models'

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll(
      {
        attributes: ['name', 'id'],
        order: [['name', 'ASC']]
      }
    )
    return res.status(200).send(categories)
  } catch (error) {
    console.log(error)
    next()
  }
}
