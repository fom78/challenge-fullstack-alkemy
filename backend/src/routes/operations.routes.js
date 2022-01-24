import { Router } from 'express'
// DataBase
import {con} from '../database'

const router = Router()

// Route for create an operation
router.post("/", (req, res) => {
    const concept = req.body.concept;
    const type = req.body.type;
    const amount = req.body.amount;
    const date = req.body.date;
  
    con.query(
      "INSERT INTO operations (concept, type, amount, date) VALUES (?,?,?,?)",
      [concept, type, amount, date],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).send({message:'Operation added succefully'});
        }
      }
    );
  });

  // Route for get all operations
  router.get("/", (req, res) => {
    con.query("SELECT * FROM operations ORDER BY date DESC", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  
  // Route for get an operation by id
  router.get("/:id", (req, res) => {
    const id = req.params.id;
    con.query("SELECT * FROM operations WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(result);
      }
    });
  });

  // Route for edit an operation by id
  router.put("/:id", (req, res) => {
    const id = req.params.id;
    const amount = req.body.amount;
    const concept = req.body.concept;
    const date = req.body.date;
    con.query(
      "UPDATE operations SET concept = ?, amount = ?, date = ? WHERE id = ?",
      [concept, amount, date, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(201).send({message:'Operation edited succefully'});
        }
      }
    );
  });
  
  // Route for delete an operation by id
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    con.query("DELETE FROM operations WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(204).send(result);
      }
    });
  });

export default router
