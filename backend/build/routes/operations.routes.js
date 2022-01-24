"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _database = require("../database");

// DataBase
var router = (0, _express.Router)(); // Route for create an operation

router.post("/", function (req, res) {
  var concept = req.body.concept;
  var type = req.body.type;
  var amount = req.body.amount;
  var date = req.body.date;

  _database.con.query("INSERT INTO operations (concept, type, amount, date) VALUES (?,?,?,?)", [concept, type, amount, date], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(201).send({
        message: 'Operation added succefully'
      });
    }
  });
}); // Route for get all operations

router.get("/", function (req, res) {
  _database.con.query("SELECT * FROM operations", function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); // Route for get an operation by id

router.get("/:id", function (req, res) {
  var id = req.params.id;

  _database.con.query("SELECT * FROM operations WHERE id = ?", id, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
}); // Route for edit an operation by id

router.put("/:id", function (req, res) {
  var id = req.params.id;
  var amount = req.body.amount;
  var concept = req.body.concept;
  var date = req.body.date;

  _database.con.query("UPDATE operations SET concept = ?, amount = ?, date = ? WHERE id = ?", [concept, amount, date, id], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(201).send({
        message: 'Operation edited succefully'
      });
    }
  });
}); // Route for delete an operation by id

router["delete"]("/:id", function (req, res) {
  var id = req.params.id;

  _database.con.query("DELETE FROM operations WHERE id = ?", id, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(204).send(result);
    }
  });
});
var _default = router;
exports["default"] = _default;