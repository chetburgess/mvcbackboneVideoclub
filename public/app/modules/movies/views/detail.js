define([
  'jquery',
  'bbloader',
  'app/common/eventHandler',
  'text!app/modules/movies/views/templates/detail.html'
], function($, Backbone, eventHandler, moviesDetailHTML) {
  
  //
  var MoviesDetailView = Backbone.Marionette.ItemView.extend({

    tagName: 'div',

    className: 'span12',
    
    template: moviesDetailHTML
  });

  return MoviesDetailView;
});