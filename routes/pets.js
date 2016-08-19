var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/petHotel'

router.get('/', function(req, res) {
  console.log("GET /pets/");
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Database connction failed");
      res.sendStatus(500);
    }

    client.query('SELECT * FROM pets', function(err, result) {
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
  var pets = req.body;
  console.log("Body: ", pets);

  var nameArray = pets.ownerName.split(" ");
  var firstName = nameArray[0];
  var lastName = nameArray[1];
  console.log("firstName: ", firstName);

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Database connction failed");
      res.sendStatus(500);
    }
    /* Look up owner's id with their first and last name, so we can use their
       id when saving pets in the database. */
    client.query('SELECT * FROM owners WHERE first_name=$1 AND last_name=$2',
    [firstName, lastName], function(err, result) {
      if(err) {
        console.log("Can't look up owner: ", firstName);
        req.sendStatus(500);
      }

      console.log("ROWS: ", result.rows);

      client.query('INSERT INTO pets (color, name, breed, owner_id)'
                   + 'VALUES($1, $2, $3, $4)',
                   [pets.color, pets.petName, pets.breedName, result.rows[0].id],
                    function(err, result) {
        done();

        if(err) {
          console.log("Query failed: ", err);
          res.sendStatus(500);
        }
        res.sendStatus(201);
      })
    })
    });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log("Database connction failed");
      res.sendStatus(500);
    }


});

module.exports = router;
