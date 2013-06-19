define([
  'backbone',
  'collections/base',
  'models/movie'
], function(Backbone, BaseCollection, MovieModel) {
  
  // MovieCollection, es una clase que que agrupa/ordena/pagina/etc modelos del mismo tipo
  var MovieCollection = BaseCollection.extend({
    model: MovieModel,
    url: 'http://socramg.iriscouch.com/videoclub/_design/app/_list/get/movies'
  });

  return MovieCollection;
});