var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/petHotel'

router.get('/', function(req, res) {
  console.log("GET /guests/");
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Database connction failed");
      res.sendStatus(500);
    }

    client.query('SELECT * FROM owners ' +
                'LEFT JOIN pets ON owners.id = pets.owner_id', function(err, result) {
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






module.exports=router;
