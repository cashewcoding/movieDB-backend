const express = require("express");
require("dotenv/config");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");

// Body Parser
app.use(express.json());
app.use(cors());

// API
// GET ALL MOVIES
app.get("/movies", (req, res) => {
  res.json(movies);
});
// GET A SPECIFIC movie WITH ID
app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((b) => b.id === Number(id));
  if (!movie) {
    res.status(404).json({ error: `Movie with id ${id} not Found` });
  }
  res.json(movie);
});

app.post("/movies", (req, res) => {
  console.log("WHAT IS THE movie", req.body);
  const movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    rating: req.body.rating,
    poster: req.body.poster,
    description: req.body.description,
    imgurl: req.body.imgurl,
  };
  movies.push(movie);
  res.json(movie);
});
app.put("/movies/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find((b) => b.id === Number(id));
  if (!movie) {
    res.status(404).json({ error: `Movie with id ${id} not Found` });
  }
  movie.title = req.body.title;
  movie.author = req.body.author;
  movie.year = req.body.year;
  res.json(movie);
});
app.delete("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((b) => b.id === id);
  if (!movie) {
    res.status(404).json({ error: `Movie with id ${id} not Found` });
  }
  movies = movies.filter((movie) => movie.id !== id);
  res.json(movie);
});
app.listen(PORT, () => console.log(`server is up on port ${PORT}`));
