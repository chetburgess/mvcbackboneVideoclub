
/**
 * Module dependencies.
 */
var fs = require('fs');
var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/desarrollo_tareas');
var Schema = mongoose.Schema;

var Tarea = new Schema({
  tarea: String
});
var Tarea = mongoose.model('Tarea', Tarea);

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
   fs.readFile('index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.get('/tareas', function(req, res){
  Tarea.find({}, function (err, docs) {
    res.send(docs);
  });
}); 
app.get('/tareas/nueva', function(request, response){
  response.render('tareas/nueva.jade', {
      title: 'Nueva tarea'
  });
});

/*app.put('/movies', function(request, response){
  var tarea = new Tarea(request.body.tarea);
  tarea.save(function(err){
    if (!err) {
      response.redirect('/tareas');
    }else{
      response.redirect('/tareas/nueva');
    }
  });
});*/
//  update movies

/*
    Falta el id aca !!

*/
app.put('/movies/:id', function(req, res) {

    res.send('seems ok put method');
    var tarea = new Tarea(req.body);
    tarea.save(function(err){
      if (!err) {
        console.log('Ok');
        //response.redirect('/tareas');
      }else{
        console.log('Error' + err);
        //response.redirect('/tareas/nueva');
      }
    });
});

// Edit
app.get('/tareas/:id/editar', function(request, response){
  Tarea.findById(require.params.id, function(err, doc){
    response.render('tareas/editar', {
      title: 'Vista Editar Tarea',
      tarea: doc
    });
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
