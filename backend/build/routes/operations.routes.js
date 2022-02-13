"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _operations = require("../controllers/operations");

var _auth = require("../middlewares/auth");

// Controllers
// Middlewares
var router = (0, _express.Router)(); // add an operation

router.post('/', [_auth.verifyToken], _operations.saveOperation); // Get all operations

router.get('/', [_auth.verifyToken], _operations.getOperations); // Get an operation by id

router.get('/:id', [_auth.verifyToken], _operations.getOperation); // Edit an operation by id

router.put('/:id', [_auth.verifyToken], _operations.editOperation); // Delete an operation by id

router["delete"]('/:id', [_auth.verifyToken], _operations.deleteOperation);
var _default = router;
exports["default"] = _default;