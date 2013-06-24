define([
  'underscore',
  'backbone',
  'text!/templates/users/collection.html',
  'views/usersCollectionItem',
  'views/paginatorView',
  'eventHandlers/usersHandler'
], function(_, Backbone, UsersCollectionHTML, UsersCollectionItemView, PaginationView, UsersHandler) {
  
  // UserCollectionView es un clase que representa la vista de
  // la pelicula completa del listado de peliculas
  var UsersCollectionView = Backbone.View.extend({
    // Idicamos que queremos se cree dentro de un div
    tagName: 'div',
    className: 'span12 hide',

    //
    events: {
      'change .level': 'doSearch',
      'click .doSearch': 'doSearch',
      'keypress .search': 'matchEnter'
    },

    //
    initialize: function () {

      // Agregamos listeners
      this.listenTo(this.collection, 'sync', _.bind(this.renderCollection, this));

      //
      this.paginationView = new PaginationView({collection: this.collection});
      this.listenTo(this.paginationView, 'changePage', _.bind(this.filterItems, this));
    },

    //
    render: function () {
      
      this.$el.html(UsersCollectionHTML);
      this.$el.find('.pagination-container').append(this.paginationView.render().el);

      return this;
    },

    // Agrega una pelicula a la grilla
    addUser: function (model) {

      var itemView = new UsersCollectionItemView({model: model});

      //
      this.$el.find('.list-container').append(itemView.render().el);
    },

    // Cuando se reset-ea la collection, recargamos todas las peliculas
    renderCollection: function () {
      
      // Vemos cuales son las peliculas en la collection
      _.each(this.collection.models, function (model) {

          // La agregamos
          this.addUser(model);
      }, this);
    },

    //
    filterItems: function (page) {

      var params = {
      	page: 1,
        level: this.$el.find('.level').val(),
        name: this.$el.find('.search').val()
      };

      if (!isNaN(page) && page > 0) {

      	params.page = page;
      }

      UsersHandler.trigger('usersCollectionView:filter', this, params);
      return false;
    },

    //
    doSearch: function () {

    	this.filterItems(1);
    },

    // Si es enter
    matchEnter: function (evt) {

      if (evt.keyCode === 13) {

        this.doSearch();
      }
    }
  });

  return UsersCollectionView;
});