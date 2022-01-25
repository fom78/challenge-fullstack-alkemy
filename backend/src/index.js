import express from 'express'
import cors from 'cors'
// DataBase
import {con} from './database'
// Config
import config from './config'
// Routes
import operationRouter from './routes/operations.routes'
const app = express();

app.use(cors());
app.use(express.json());



con.connect(function(err) {
  if (err) throw err;
  console.log("DataBase is connected!");
  // con.query('CREATE DATABASE IF NOT EXISTS finance;');
  con.query('USE finance;');
    // con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, password varchar(255), PRIMARY KEY(id));', function(error, result, fields) {
    //   console.log('Tabla users OK');
    // });
  // con.end();
});

// routes
app.use('/operations', operationRouter)

app.listen(config.PORT, () => {
  console.log(`Server run on port ${config.PORT}`);
});
