import Sequelize from 'sequelize'
import { db } from '../config/db'

const User = db.define('users', {
  id: { type: Sequelize.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
  uid: { type: Sequelize.TEXT, allowNull: false, unique: true },
  actual_access_token: {
    type: Sequelize.STRING
  },
  rol: { type: Sequelize.ENUM('admin', 'mod', 'user', 'banned'), defaultValue: 'user', allowNull: false }
})

export default User
