define([
  'jquery',
  'underscore',
  'backbone',
  'models/movie'
], function($, _, Backbone, MovieModel) {
  
  // MovieCollection, es una clase que que agrupa/ordena/pagina/etc modelos del mismo tipo
  var MovieCollection = Backbone.Collection.extend({
    model: MovieModel,
    totalItems : 0,
    pageNumber : 1,
    pageSize : 10,
    url: 'http://socramg.iriscouch.com/videoclub/_design/app/_list/get/movies',
    parse: function (resp, options) {
      
      this.totalItems = resp.total;
    	return resp.rows;
    },
    nextPage: function (filterParams) {

      this.pageNumber = this.pageNumber + 1;
      return this.fetch(filterParams);
    },
    previousPage: function (filterParams) {

      this.pageNumber = this.pageNumber - 1;
      return this.fetch(filterParams);
    },
    goToPage: function (pageNumber, filterParams) {

      this.pageNumber = pageNumber;
      return this.fetch(filterParams);
    },
    fetch: function (options) {

      var options = options || {};
      //options.dataType = 'jsonp';
      $.extend(options.data || (options.data = {}), {
        'page': this.pageNumber,
        'size': this.pageSize
      });
      Backbone.Collection.prototype.fetch.call(this, options);
    }
  });

  return MovieCollection;
});