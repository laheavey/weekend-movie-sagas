const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const sqlQuery = `
  SELECT * FROM "genres"
  ORDER BY "name" ASC;
  `
  pool.query(sqlQuery)
  .then((response) => {
    res.send(response.rows)
  })
  .catch((error) => {
    console.log('Error in GET /api/genres')
    res.sendStatus(500)
  })
  
});

module.exports = router;