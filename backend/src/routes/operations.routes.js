import { Router } from 'express'
// DataBase
import {con} from '../database'

const router = Router()

// Route for create an operation
router.post("/", (req, res) => {
    
      const concept = req.body.concept;
      const categoryId = req.body.categoryId;
      // Only two types !
      const type = req.body.type === 'income' ? 'income' : 'expenditure';
      const amount = req.body.amount;
      const date = req.body.date;
    
      // Verify if category exist
      con.query("SELECT * FROM categories WHERE id = "+ con.escape(categoryId), (err, result) => {
        if (err) {
          console.log(err);
        } 
        if (result.length === 0) {
          return res.status(413).send({message: 'The category not found'})
        } else {
          con.query(
            "INSERT INTO operations (concept, type, category_id, amount, date) VALUES (?,?,?,?,?)",
            [concept, type, categoryId, amount, date],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log(result.insertId);
                res.status(201).send({message:'Operation added succefully'});
              }
            });
        }
      });
      
  })

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
    const categoryId = req.body.categoryId;
    const amount = req.body.amount;
    const concept = req.body.concept;
    const date = req.body.date;
    con.query(
      "UPDATE operations SET concept = ?, amount = ?, date = ?, category_id = ? WHERE id = ?",
      [concept, amount, date, categoryId, id],
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
