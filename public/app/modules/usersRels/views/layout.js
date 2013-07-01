define([
    'underscore',
    'bbloader',
    'app/common/eventHandler',
    'text!app/modules/usersRels/views/templates/layout.html'
], function(_, Backbone, eventHandler, usersRelsLayoutHTML) {
  
  //
  var UsersRelsCollectionLayout = Backbone.Marionette.Layout.extend({

    tagName: 'div',

    className: 'span12',

    template: usersRelsLayoutHTML,

    regions: {
        table: '.collection-container'
    },

    //
    events: {
      'click .doSearch': 'doSearch',
      'keypress .search': 'matchEnter'
    },

    //
    filter: function (page) {

      var params = {
        page: 1,
        name: this.$el.find('.search').val()
      };

      if (!isNaN(page) && page > 0) {

        params.page = page;
      }

      eventHandler.trigger('usersRels:collection:filter', params);
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

    return UsersRelsCollectionLayout;
});