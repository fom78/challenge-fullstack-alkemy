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

export const editCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name } = req.body
    await Category.update(
      {
        name
      },
      {
        where:
          { id }
      })

    const category = await Category.findByPk(id)
    res.status(201).send(category)
  } catch (error) {
    console.log(error)
    next()
  }
}

export const saveCategory = async (req, res, next) => {
  try {
    const name = req.body.name
    const categoryAdded = await Category.create(
      {
        name
      }
    )
    res.status(201).send(categoryAdded)
  } catch (error) {
    console.log(error)
    next()
  }
}
