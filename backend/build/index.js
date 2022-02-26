"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _db = require("./config/db");

var _config = _interopRequireDefault(require("./config"));

var _operations = _interopRequireDefault(require("./routes/operations.routes"));

var _categories = _interopRequireDefault(require("./routes/categories.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// DataBase
// Config
// Routes
var apiUrl = '/api/v1/';
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json()); // Connect to DB
// db.authenticate()

_db.db.sync({
  force: false
}).then(function () {
  return console.log('Connection has been established successfully.');
})["catch"](function (error) {
  return console.log('Unable to connect to the database:', error);
}); // routes


app.use("".concat(apiUrl, "operations"), _operations["default"]);
app.use("".concat(apiUrl, "categories"), _categories["default"]);
app.use("".concat(apiUrl, "auth"), _auth["default"]);
app.listen(_config["default"].PORT, function () {
  console.log("Server run on port ".concat(_config["default"].PORT));
});