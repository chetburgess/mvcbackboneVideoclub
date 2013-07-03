define([
  'bbloader',
  'text!app/modules/usersRels/views/templates/collectionItem.html'
], function (Backbone, usersRelsCollectionItemHTML) {
  
  //
  var UsersRelsCollectionItemView = Backbone.Marionette.ItemView.extend({
    
    tagName: 'tr',

    template: usersRelsCollectionItemHTML,
    
    events: {
      'click button.remove': 'confirmRemove'
    },

    confirmRemove: function() {

      this.trigger('confirmRemove', this);
    }
  });

  return UsersRelsCollectionItemView;
});