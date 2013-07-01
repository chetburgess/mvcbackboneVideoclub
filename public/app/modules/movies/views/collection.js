define([
  'underscore',
  'bbloader',
  'app/common/eventHandler',
  'text!app/modules/movies/views/templates/collection.html',
  'app/modules/movies/views/collectionItem'
], function(_, Backbone, eventHandler, moviesCollectionHTML, MoviesCollectionItemView) {
  
  //
  var MoviesCollectionView = Backbone.Marionette.CompositeView.extend({

    tagName: 'table',

    className: 'table table-striped',

    template: moviesCollectionHTML,

    itemView: MoviesCollectionItemView,

    itemViewContainer: 'tbody'
  });

  return MoviesCollectionView;
});