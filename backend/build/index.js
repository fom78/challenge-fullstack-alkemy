"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _database = require("./database");

var _config = _interopRequireDefault(require("./config"));

var _operations = _interopRequireDefault(require("./routes/operations.routes"));

var _categories = _interopRequireDefault(require("./routes/categories.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// DataBase
// Config
// Routes
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());

_database.con.connect(function (err) {
  if (err) throw err;
  console.log('DataBase is connected!'); // con.query('CREATE DATABASE IF NOT EXISTS finance;');

  _database.con.query('USE finance;'); // con.end();

}); // routes


app.use('/operations', _operations["default"]);
app.use('/categories', _categories["default"]);
app.listen(_config["default"].PORT, function () {
  console.log("Server run on port ".concat(_config["default"].PORT));
});