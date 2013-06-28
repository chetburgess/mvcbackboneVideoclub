
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/deloitte_tool');
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
  res.send('Hello World');
});

app.get('/tareas', function(req, res){
  Tarea.find({}, function (err, docs) {
    res.render('tareas/index', {
      title: 'Vista index lista de tareas',
      docs: docs
    });
  });
}); 
app.get('/tareas/nueva', function(request, response){
  response.render('tareas/nueva.jade', {
      title: 'Nueva tarea'
  });
});

app.post('/tareas', function(request, response){
  var tarea = new Tarea(request.body.tarea);
  tarea.save(function(err){
    if (!err) {
      response.redirect('/tareas');
    }else{
      response.redirect('/tareas/nueva');
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
