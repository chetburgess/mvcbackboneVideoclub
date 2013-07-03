define([
    'underscore',
    'bbloader',
    'text!app/modules/usersRels/views/templates/layout.html'
], function (_, Backbone, usersRelsLayoutHTML) {
  
  //
  var UsersRelsCollectionLayout = Backbone.Marionette.Layout.extend({

    tagName: 'div',

    template: usersRelsLayoutHTML,

    regions: {
        pagination: '.pagination-container',
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

      this.trigger('filter', params);
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