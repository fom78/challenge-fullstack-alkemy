"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _database = require("../database");

// DataBase
var router = (0, _express.Router)(); // Route for create an operation

router.post('/', function (req, res) {
  var concept = req.body.concept;
  var categoryId = req.body.categoryId; // Only two types !

  var type = req.body.type === 'income' ? 'income' : 'expenditure';
  var amount = req.body.amount;
  var date = req.body.date; // Verify if category exist

  _database.con.query('SELECT * FROM categories WHERE id = ' + _database.con.escape(categoryId), function (err, result) {
    if (err) {
      console.log(err);
    }

    if (result.length === 0) {
      return res.status(413).send({
        message: 'The category not found'
      });
    } else {
      _database.con.query('INSERT INTO operations (concept, type, category_id, amount, date) VALUES (?,?,?,?,?)', [concept, type, categoryId, amount, date], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(result.insertId);
          res.status(201).send({
            message: 'Operation added succefully'
          });
        }
      });
    }
  });
}); // Route for get all operations

router.get('/', function (req, res) {
  _database.con.query('SELECT operations.*, categories.name AS category  FROM operations INNER JOIN categories ON operations.category_id = categories.id ORDER BY date DESC', function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}); // Route for get an operation by id

router.get('/:id', function (req, res) {
  var id = req.params.id;

  _database.con.query('SELECT * FROM operations WHERE id = ?', id, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(result);
    }
  });
}); // Route for edit an operation by id

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var categoryId = req.body.categoryId;
  var amount = req.body.amount;
  var concept = req.body.concept;
  var date = req.body.date;

  _database.con.query('UPDATE operations SET concept = ?, amount = ?, date = ?, category_id = ? WHERE id = ?', [concept, amount, date, categoryId, id], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(201).send({
        message: 'Operation edited succefully'
      });
    }
  });
}); // Route for delete an operation by id

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;

  _database.con.query('DELETE FROM operations WHERE id = ?', id, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(204).send(result);
    }
  });
});
var _default = router;
exports["default"] = _default;