import Sequelize from 'sequelize'
import { db } from '../config/db'

const Category = db.define('categories', {
  id: { type: Sequelize.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
  name: {
    type: Sequelize.STRING
  }
})

export default Category
