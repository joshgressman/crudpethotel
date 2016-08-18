var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/petHotel'

router.get('/', function(req, res) {
  console.log("GET /owners/");
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Database connction failed");
      res.sendStatus(500);
    }

    client.query('SELECT * FROM owners', function(err, result) {
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

router.post('/', function(req, res) {
  var owner = req.body;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Database connction failed");
      res.sendStatus(500);
    }

    client.query('INSERT INTO owners (first_name, last_name)'
                 + 'VALUES($1, $2)',
                 [owner.firstName, owner.lastName],
                  function(err, result) {
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
