const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  console.log('req.body: ', req.body);
  console.log('req.params: ', req.params)
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
  ORDER BY "movies"."title" ASC;`
  const sqlValues =[req.params.id]
  pool.query(sqlQuery, sqlValues)
  .then((response) => {
    res.send(response.rows)
  })
  .catch((error) => {
    console.log('Error in GET /api/details')
    res.sendStatus(500)
  })
  
});

module.exports = router;