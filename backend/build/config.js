"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var _default = {
  AWS_HOST: process.env.AWS_HOST,
  AWS_USER: process.env.AWS_USER,
  AWS_PASSWORD: process.env.AWS_PASSWORD,
  PORT: process.env.PORT || 3000
};
exports["default"] = _default;