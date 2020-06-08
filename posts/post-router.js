const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  // list of posts
  //select from posts
  //all database operations return a promise
  db.select("*")
    .from("posts")
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((err) => {
      console.log("GET /error", error);
      res.status(500).json({ error: error.message });
    });
});

router.get("/:id", (req, res) => {
  // a post by it's id
  // select posts where id = req.params.id
  //first() will grab the first item o the retuned array
  db("posts")
    .select("*")
    .where({ id: req.params.id })
    .first()
    .then((post) => {
      res.status(200).json({ data: post });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: " Could not get id" });
    });
});

router.post("/", (req, res) => {
  //add a new post and return the body of new record
  //insert into posts() values()
  db("posts")
    .insert(req.body, "id") // will generate a warning on console when using sqlie, ignore that
    .then((ids) => {
      db("posts")
        .where("id", ids[0])
        .then((post) => {
          res.status(201).json(ids);
        });
    })
    .catch((err) => {
      console.log({ error: err.message });
    });
});

router.put("/:id", (req, res) => {
  // update a new record
  // remember to filter or all records will be updated
  // could be partial changes, only one column is enough
  // you get a number back
  const id = req.params.id;
  const changes = req.body;
  db("posts")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "no records found" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  //delete a record
  const id = req.params.id;

  db("posts")
    .where({ id })
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "Record has been deleted", count });
      } else {
        res.status(404).json({ message: "Record not found" });
      }
    });
});

module.exports = router;

// you can make a function to use somewere else
//then(ids => {return getById(ids[0]).then(inserted => {res.status(210).json(inserted)})})
function getById(id) {
  return db("posts").where({ id }).first();
}
