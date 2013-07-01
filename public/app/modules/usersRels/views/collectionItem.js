define([
  'bbloader',
  'app/common/eventHandler',
  'text!app/modules/usersRels/views/templates/collectionItem.html'
], function(Backbone, eventHandler, usersRelsCollectionItemHTML) {
  
  //
  var UsersRelsCollectionItemView = Backbone.Marionette.ItemView.extend({
    
    tagName: 'tr',

    template: usersRelsCollectionItemHTML,
    
    events: {
      'click button.remove': 'confirmRemove'
    },

    confirmRemove: function() {

      eventHandler.trigger('usersRels:collection:confirmRemove', this);
    }
  });

  return UsersRelsCollectionItemView;
});