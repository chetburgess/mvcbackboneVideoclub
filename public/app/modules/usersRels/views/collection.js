define([
  'bbloader',
  'app/common/eventHandler',
  'text!app/modules/usersRels/views/templates/collection.html',
  'app/modules/usersRels/views/collectionItem'
], function (Backbone, eventHandler, usersRelsCollectionHTML, UsersRelsCollectionItemView) {
  
  //
  var UsersRelsCollectionView = Backbone.Marionette.CompositeView.extend({

    tagName: 'table',

    className: 'table table-striped',

    template: usersRelsCollectionHTML,

    itemView: UsersRelsCollectionItemView,

    itemViewContainer: 'tbody'
  });

  return UsersRelsCollectionView;
});