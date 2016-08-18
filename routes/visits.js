var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/petHotel'

router.get('/', function(req, res) {
  console.log("GET /visits/");
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Database connction failed");
      res.sendStatus(500);
    }

    client.query('SELECT * FROM visits', function(err, result) {
      done();

      if(err) {
        console.log("Query failed: ", err);
        res.sendStatus(500);
      }
      console.log("result: ", result.rows);
      res.send(result.rows);
    })
  })
});

module.exports = router;
