const express = require("express");
require("dotenv/config");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");

// BODY PARSER
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>Movie API</h1>");
});

const moviesRouter = require("./movies.js");
app.use("/api/movies", moviesRouter);

app.listen(PORT, () => console.log(`Server is up on port ${PORT}`));
