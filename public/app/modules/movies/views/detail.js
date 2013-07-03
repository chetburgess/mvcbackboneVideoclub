define([
  'bbloader',
  'text!app/modules/movies/views/templates/detail.html'
], function (Backbone, moviesDetailHTML) {
  
  //
  var MoviesDetailView = Backbone.Marionette.ItemView.extend({

    tagName: 'div',
    
    template: moviesDetailHTML
  });

  return MoviesDetailView;
});