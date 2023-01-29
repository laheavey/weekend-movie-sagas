const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET route for movie details by ID:
router.get('/:id', (req, res) => {
  // SQL Query selects useful columns & data from three tables,
  // returns a single row for each movie.
  const sqlQuery = `
    SELECT
      "movies"."id",
      "movies"."title",
      "movies"."poster",
      "movies"."description",
      JSON_AGG("movies_genres"."genre_id") AS "genre_ids",
      JSON_AGG("genres"."name") as "genre_names"
    FROM "movies"
    JOIN "movies_genres"
      ON "movies_genres"."movie_id" = "movies"."id"
    JOIN "genres"
      ON "movies_genres"."genre_id" = "genres"."id"
    WHERE "movies"."id" = $1
    GROUP BY 
      "movies"."id",
      "movies"."title",     
      "movies"."poster",
      "movies"."description"
    ORDER BY "movies"."title" ASC;`;
  const sqlValues =[req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((response) => {
    res.send(response.rows);
  })
  .catch((error) => {
    console.log('Error in GET /api/detail/:id : ', error);
    res.sendStatus(500);
  })
});




module.exports = router;