import mysql from 'mysql'
// Config
import config from './config'

export const con = mysql.createConnection({
    user: config.AWS_USER,
    host: config.AWS_HOST,
    password: config.AWS_PASSWORD,
  });