import Sequelize from 'sequelize'
import { db } from '../config/db'

const Operation = db.define('operations', {
  id: { type: Sequelize.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
  concept: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.BIGINT
  },
  date: {
    type: Sequelize.DATE
  },
  type: {
    type: Sequelize.STRING
  },
  user_id: {
    type: Sequelize.BIGINT(11),
    field: 'user_id',
    unique: true,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  category_id: {
    type: Sequelize.BIGINT(11),
    field: 'category_id',
    unique: true,
    references: {
      model: 'Category',
      key: 'id'
    }
  }
})

export default Operation
