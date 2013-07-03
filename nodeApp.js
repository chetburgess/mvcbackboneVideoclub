
/**
 * Module dependencies.
 */
var fs = require('fs');
var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/deloitte');
var Schema = mongoose.Schema;

var Movies = mongoose.model('Movies', new Schema({
  title: String,
  year: Number,
  rating: Number,
  genre: String,
  poster: String
}));

var Users = mongoose.model('Users', new Schema({
  name: String,
  lastName: String,
  email: String
}));

var UsersRels = mongoose.model('UsersRels', new Schema({
  idReg: String,
  type: String,
  idUser: String
}));

var app = express();

app.configure(function () {

  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {

  app.use(express.errorHandler());
});


//
app.get('/', function (req, res) {

  fs.readFile('index.html', 'utf8', function (err, text) {
    res.send(text);
  });
});


///
// MOVIES
//
// select
app.get('/movies', function (req, res) {

  Movies.find({}, function (err, docs) {

    res.send(docs);
  });
});
// insert
app.post('/movies', function (req, res) {

  var doc = new Movies(req.body);
  doc.save(function (err, doc) {

    if (!err) {

      res.send(doc);
    }
    else {

      res.send('{"success":false}');
    }
  });
});
// update
app.put('/movies/:id', function (req, res) {

  Movies.findById(req.params.id, function (err, doc) {

    if (!err) {

      for (var i in req.body) {

        if (i !== '_id') {
          doc[i] = req.body[i];
        }
      }

      doc.save(function (err, doc) {

        if (!err) {

          res.send(doc);
        }
        else {

          res.status(403).send('{"success":false}');
        }
      });
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});
// edit
app.get('/movies/:id', function (req, res) {

  Movies.findById(req.params.id, function (err, doc) {

    if (!err) {

      res.send(doc);
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});
// remove
app.delete('/movies/:id', function (req, res) {

  Movies.remove({_id: req.params.id}, function (err) {

    if (!err) {

      res.send('{"success":true}');
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});


///
// USERS
//
// select
app.get('/users', function (req, res) {

  Users.find({}, function (err, docs) {

    res.send(docs);
  });
});
// insert
app.post('/users', function (req, res) {

  var doc = new Users(req.body);
  doc.save(function (err, doc) {

    if (!err) {

      res.send(doc);
    }
    else {

      res.send('{"success":false}');
    }
  });
});
// update
app.put('/users/:id', function (req, res) {

  Users.findById(req.params.id, function (err, doc) {

    if (!err) {

      for (var i in req.body) {

        if (i !== '_id') {
          doc[i] = req.body[i];
        }
      }

      doc.save(function (err, doc) {

        if (!err) {

          res.send(doc);
        }
        else {

          res.status(403).send('{"success":false}');
        }
      });
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});
// edit
app.get('/users/:id', function (req, res) {

  Users.findById(req.params.id, function (err, doc) {

    if (!err) {

      res.send(doc);
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});
// remove
app.delete('/users/:id', function (req, res) {

  Users.remove({_id: req.params.id}, function (err) {

    if (!err) {

      res.send('{"success":true}');
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});


///
// UsersRels
//
// select
app.get('/usersRels', function (req, res) {

  UsersRels.find({idReg: req.params.idReg, typeReg: req.params.typeReg}, function (err, docs) {

    res.send(docs);
  });
});
// insert
app.post('/usersRels', function (req, res) {

  var doc = new UsersRels(req.body);
  doc.save(function (err, doc) {

    if (!err) {

      res.send(doc);
    }
    else {

      res.send('{"success":false}');
    }
  });
});
// remove
app.delete('/usersRels/:id', function (req, res) {

  UsersRels.remove({_id: req.params.id}, function (err) {

    if (!err) {

      res.send('{"success":true}');
    }
    else {

      res.status(404).send('{"success":false}');
    }
  });
});


http.createServer(app).listen(app.get('port'), function () {

  console.log("Express server listening on port " + app.get('port'));
});
