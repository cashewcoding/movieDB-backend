const express = require("express");
const cors = require("cors");
const pool = require("./pool.js");
const moviesRouter = express.Router();

// BODY PARSER
moviesRouter.use(express.json());
moviesRouter.use(cors());

// API
// GET ALL MOVIES
moviesRouter.get("/", (req, res) => {
  pool
    .query("SELECT * FROM movies;")
    .then((data) => {
      console.log(data);
      res.json(data.rows);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// GET ALL MOVIES FROM ONE GENRE
moviesRouter.get("/genre/:genre", (req, res) => {
  pool
    .query("SELECT * FROM movies WHERE genre = $1;", [req.params.genre])
    .then((data) => {
      console.log(data);
      res.json(data.rows);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// SEARCH MOVIES
// const query = req.query.query;
moviesRouter.get("/search", (req, res) => {
  pool
    .query("SELECT * FROM movies WHERE title ILIKE $1 OR director ILIKE $1;", [
      `%${req.query.query}%`,
    ])
    .then((data) => {
      console.log(data);
      res.json(data.rows);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// GET A SPECIFIC MOVIE WITH ID
moviesRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM movies WHERE id=$1;", [id])
    .then((data) => {
      console.log(data);
      if (data.rowCount === 0) {
        res.status(404).json({ message: "Movie not found" });
      }
      res.json(data.rows[0]);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// CREATE NEW MOVIE
moviesRouter.post("/", (req, res) => {
  const { title, director, year, genre, rating, poster, description, imgurl } =
    req.body; // form data from body
  pool
    .query(
      "INSERT INTO movies (title, director, year, rating, poster, description, imgurl, created) VALUES ($1,$2,$3,$4,$5,$6,$7,NOW()) RETURNING *;",
      [title, director, year, rating, poster, description, imgurl]
    )
    .then((data) => {
      console.log(data);
      res.status(201).json(data.rows[0]);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// UPDATE MOVIE
moviesRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, director, year, genre, rating, poster, description, imgurl } =
    req.body; // form data from body
  pool
    .query(
      "UPDATE movies SET title=$1,director=$2,year=$3,rating=$4,poster=$5,description=$6,imgurl=$7 WHERE id=$8 RETURNING *;",
      [title, director, year, rating, poster, description, imgurl, id]
    )
    .then((data) => {
      console.log(data);
      res.status(201).json(data.rows[0]);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

// DELETE MOVIE
moviesRouter.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  pool
    .query("DELETE FROM movies WHERE id=$1 RETURNING *;", [id])
    .then((data) => {
      console.log(data);
      res.json(data.rows[0]);
    })
    .catch((e) => res.status(500).json({ message: e.message }));
});

module.exports = moviesRouter;
