import '@babel/polyfill'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
// DataBase
import { db } from './config/db'
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

// Connect to DB
// db.authenticate()
db.sync({ force: false })
  .then(() => console.log('Connection has been established successfully.'))
  .catch(error => console.log('Unable to connect to the database:', error))

// routes
app.use(`${apiUrl}operations`, operationRouter)
app.use(`${apiUrl}categories`, categoryRouter)
app.use(`${apiUrl}auth`, authRouter)

app.listen(config.PORT, () => {
  console.log(`Server run on port ${config.PORT}`)
})
