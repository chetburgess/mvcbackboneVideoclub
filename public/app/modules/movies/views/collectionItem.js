define([
  'bbloader',
  'app/common/eventHandler',
  'text!app/modules/movies/views/templates/collectionItem.html'
], function(Backbone, eventHandler, moviesCollectionItemHTML) {
  
  //
  var MoviesCollectionItemView = Backbone.Marionette.ItemView.extend({
    
    tagName: 'tr',

    template: moviesCollectionItemHTML,
    
    events: {
      'click button.remove': 'confirmRemove',
      'click button.info': 'showInfo'
    },

    confirmRemove: function() {

      eventHandler.trigger('movies:collection:confirmRemove', this);
    },

    showInfo: function() {

      eventHandler.trigger('movies:collection:showInfo', this);
    }
  });

  return MoviesCollectionItemView;
});