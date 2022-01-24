"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.con = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Config
var con = _mysql["default"].createConnection({
  user: _config["default"].AWS_USER,
  host: _config["default"].AWS_HOST,
  password: _config["default"].AWS_PASSWORD
});

exports.con = con;