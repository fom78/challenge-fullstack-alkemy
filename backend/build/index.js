"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _database = require("./database");

var _config = _interopRequireDefault(require("./config"));

var _operations = _interopRequireDefault(require("./routes/operations.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// DataBase
// Config
// Routes
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());

_database.con.connect(function (err) {
  if (err) throw err;
  console.log("DataBase is connected!");

  _database.con.query('CREATE DATABASE IF NOT EXISTS finance;');

  _database.con.query('USE finance;');

  _database.con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, password varchar(255), PRIMARY KEY(id));', function (error, result, fields) {
    console.log('Tabla users OK');
  });

  _database.con.query('CREATE TABLE IF NOT EXISTS operations(id int NOT NULL AUTO_INCREMENT, concept varchar(255), type varchar(40), amount int,date DATE, PRIMARY KEY(id));', function (error, result, fields) {
    console.log('Tabla operations OK');
  }); // con.end();

}); // routes


app.use('/operations', _operations["default"]);
app.listen(_config["default"].PORT, function () {
  console.log("Server run on port ".concat(_config["default"].PORT));
});