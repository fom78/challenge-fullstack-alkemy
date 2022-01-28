import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
// DataBase
import { con } from './database'
// Config
import config from './config'
// Routes
import operationRouter from './routes/operations.routes'
import categoryRouter from './routes/categories.routes'
import authRouter from './routes/auth.routes'

const apiUrl = '/api/v1/'
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

con.connect(function (err) {
  if (err) throw err
  console.log('DataBase is connected!')
  // con.query('CREATE DATABASE IF NOT EXISTS finance;');
  con.query('USE finance;')
  // con.end();
})

// routes
app.use(`${apiUrl}operations`, operationRouter)
app.use(`${apiUrl}categories`, categoryRouter)
app.use(`${apiUrl}auth`, authRouter)

app.listen(config.PORT, () => {
  console.log(`Server run on port ${config.PORT}`)
})
