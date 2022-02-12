import Sequelize from 'sequelize'
// Config
import config from '.'

export const db = new Sequelize('finance', config.AWS_USER, config.AWS_PASSWORD, {
  host: config.AWS_HOST,
  port: '3306',
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorAliases: false
})
