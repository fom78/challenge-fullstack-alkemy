import { Operation, Category, User } from '../models'

export const saveOperation = async (req, res, next) => {
  try {
    const concept = req.body.concept
    const categoryId = req.body.categoryId
    // Only two types !
    const type = req.body.type === 'income' ? 'income' : 'expenditure'
    const amount = req.body.amount
    const date = req.body.date
    const actualUserId = req.body.actualUserId
    const operationAdded = await Operation.create(
      {
        concept,
        type,
        amount,
        date,
        user_id: actualUserId,
        category_id: categoryId
      }
    )
    return res.status(201).send(operationAdded)
  } catch (error) {
    console.log(error)
    next()
  }
}

export const getOperations = async (req, res, next) => {
  try {
    const { actualUserId } = req.body
    const operations = await Operation.findAll(
      {
        attributes: ['concept', 'date', 'amount', 'type', 'id'],
        where: { user_id: actualUserId },
        include: [
          {
            model: Category,
            attributes: ['name']
          },
          {
            model: User,
            attributes: ['uid', 'id']
          }
        ],
        order: [['date', 'DESC']]
      }
    )
    // res.json(operations)
    return res.status(200).send(operations)
  } catch (error) {
    console.log(error)
    next()
  }
}

export const getOperation = async (req, res, next) => {
  try {
    const { id } = req.params
    const actualUserId = req.body.actualUserId
    const operation = await Operation.findOne(
      {
        where: { id, user_id: actualUserId },
        include: [
          {
            model: Category,
            attributes: ['name']
          },
          {
            model: User,
            attributes: ['actual_access_token', 'id']
          }
        ]
      })
    res.json(operation)
  } catch (error) {
    console.log(error)
    next()
  }
}

export const editOperation = async (req, res, next) => {
  try {
    const { id } = req.params
    const { concept, amount, categoryId, date } = req.body
    await Operation.update(
      {
        concept,
        amount,
        date,
        category_id: categoryId
      },
      {
        where:
                { id }
      })

    const operation = await Operation.findByPk(id)
    res.status(201).send(operation)
  } catch (error) {
    console.log(error)
    next()
  }
}

export const deleteOperation = async (req, res, next) => {
  try {
    const { id } = req.params
    const { actualUserId } = req.body
    const deleted = await Operation.destroy({ where: { id, user_id: actualUserId } })
    if (!deleted) {
      return res.status(205).json({ mensaje: 'Operation not deleted, check permissions' })
    }
    return res.status(203).json({ mensaje: 'Operation deleted successfully' })
  } catch (error) {
    console.log(error)
    next()
  }
}
