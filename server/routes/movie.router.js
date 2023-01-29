const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET route for all movies
router.get('/', (req, res) => {
  // SQL query selects all columns from table "movies"
  const query = `
    SELECT * FROM "movies" 
    ORDER BY "title" ASC;`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error in GET /api/movie: ', error);
      res.sendStatus(500);
    })
});

// POST route 
router.post('/', (req, res) => {
  console.log('Req.body: ', req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
      .then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

router.put('/:id', (req, res) => {
  console.log('Req.body: ', req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  UPDATE "movies" 
  SET "title"=$1, "poster"=$2, "description"=$3
  WHERE "id"=$4;`;

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description, req.body.id])
  .then(result => {
    console.log('Movie table updated')

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      UPDATE "movies_genres" 
      SET "genre_id" = $1
      WHERE "movie_id" = $2;
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [req.body.genre_id, req.body.id])
      .then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;