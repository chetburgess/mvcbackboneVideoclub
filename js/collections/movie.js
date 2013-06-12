define([
  'jquery',
  'underscore',
  'backbone',
  'models/movie'
], function($, _, Backbone, MovieModel) {
  
  // MovieCollection, es una clase que que agrupa/ordena/pagina/etc modelos del mismo tipo
  var MovieCollection = Backbone.Collection.extend({
    model: MovieModel,
    url: 'http://socramg.iriscouch.com/videoclub/_design/app/_list/get/movies',
    parse: function (resp, options) {
    	return resp.rows;
    }
  });

  return MovieCollection;
});