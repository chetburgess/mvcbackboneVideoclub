define([
  'bbloader',
  'text!app/modules/movies/views/templates/collectionItem.html'
], function (Backbone, moviesCollectionItemHTML) {
  
  //
  var MoviesCollectionItemView = Backbone.Marionette.ItemView.extend({
    
    tagName: 'tr',

    template: moviesCollectionItemHTML,
    
    events: {
      'click button.remove': 'confirmRemove',
      'click button.info': 'showInfo'
    },

    confirmRemove: function() {

      this.trigger('confirmRemove', this);
    },

    showInfo: function() {

      this.trigger('showInfo', this);
    }
  });

  return MoviesCollectionItemView;
});