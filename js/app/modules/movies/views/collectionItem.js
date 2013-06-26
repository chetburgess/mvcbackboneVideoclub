define([
  'bbloader',
  'eventHandlers/moviesHandler',
  'text!app/modules/movies/views/templates/collectionItem.html'
], function(Backbone, eventHandler, moviesCollectionItemHTML) {
  
  //
  var MoviesCollectionItemView = Backbone.Marionette.ItemView.extend({
    
    tagName: 'tr',

    template: moviesCollectionItemHTML,
    
    events: {
      'click button.remove': 'remove'
    },

    remove: function() {

      eventHandler.trigger('movies:collection:confirmRemove', this);
    }
  });

  return MoviesCollectionItemView;
});