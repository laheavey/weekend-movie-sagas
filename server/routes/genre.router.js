const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET route for genre options
router.get('/', (req, res) => {
  // SQL Query selects all columns from table "genres"
  const sqlQuery = `
  SELECT * FROM "genres"
  ORDER BY "name" ASC;`;
  pool.query(sqlQuery)
  .then((response) => {
    res.send(response.rows);
  })
  .catch((error) => {
    console.log('Error in GET /api/genre: ', error);
    res.sendStatus(500);
  })
});

module.exports = router;