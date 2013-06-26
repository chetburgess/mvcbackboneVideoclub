define([
  'underscore',
  'bbloader',
  'eventHandlers/moviesHandler',
  'text!app/modules/movies/views/templates/collection.html',
  'app/modules/movies/views/collectionItem',
  //'views/paginatorView'
], function(_, Backbone, eventHandler, moviesCollectionHTML, MoviesCollectionItemView) {
  
  //
  var MoviesCollectionView = Backbone.Marionette.CompositeView.extend({

    tagName: 'div',

    className: 'span12',

    template: moviesCollectionHTML,

    itemView: MoviesCollectionItemView,

    itemViewContainer: 'tbody',

    //
    events: {
      'change .genre': 'doSearch',
      'click .doSearch': 'doSearch',
      'keypress .search': 'matchEnter'
    },

    //
    filter: function (page) {

      var params = {
        page: 1,
        genre: this.selectedGenre = this.$el.find('.genre').val(),
        title: this.$el.find('.search').val()
      };

      if (!isNaN(page) && page > 0) {

        params.page = page;
      }

      eventHandler.trigger('movies:collection:filter', this, params);
      return false;
    },

    //
    doSearch: function () {

      this.filter(1);
    },

    // Si 
    matchEnter: function (evt) {

      if (evt.keyCode === 13) {

        this.doSearch();
      }
    }
  });

  return MoviesCollectionView;
});