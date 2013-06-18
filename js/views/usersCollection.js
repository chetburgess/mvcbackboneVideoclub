define([
  'underscore',
  'backbone',
  'text!/templates/users/collection.html',
  'views/userCollectionItem',
  'views/paginatorView'
], function(_, Backbone, UsersCollectionHTML, UsersCollectionItemView, PaginationView) {
  
  // UserCollectionView es un clase que representa la vista de
  // la pelicula completa del listado de peliculas
  var UsersCollectionView = Backbone.View.extend({
    // Idicamos que queremos se cree dentro de un div
    tagName: 'div',
    className: 'span12 hide',

    //
    events: {
      'change .genre': 'doSearch',
      'click .doSearch': 'doSearch',
      'keypress .search': 'matchEnter'
    },

    //
    initialize: function () {

      _.bindAll(this, ['renderCollection', 'filterItems']);

      // Agregamos listeners
      this.listenTo(this.collection, 'sync', this.renderCollection);

      //
      this.paginationView = new PaginationView({collection: this.collection});
      this.listenTo(this.paginationView, 'changePage', this.filterItems);
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
      this.$el.find('.list-container').append(itemView.render().el);
    },

    // Cuando se reset-ea la collection, recargamos todas las peliculas
    renderCollection: function () {
      
      // Vemos cuales son las peliculas en la collection
      _.each(this.collection.models, function (model) {

          // La agregamos
          this.addUser(model);
      }, this);

      // Creamos las opciones del select
      this.setGenreFilter();
    },

    // Genero seleccionado
    selectedGenre: '',

    // 
    setGenreFilter: function () {

      var select = this.$el.find('.genre'),
        genres = _.uniq(this.collection.pluck('genre'), false, function (genre) {
          return genre;
        }),
        genreSet = this.selectedGenre;

      // Limpiamos
      select.html('');

      // Agregamos el all
      $('<option/>', {
        value: '',
        text: 'Todos'
      }).appendTo(select);

      //
      _.each(genres, function (genre) {

        var option = $('<option/>', {
          value: genre.toLowerCase(),
          text: genre
        }).appendTo(select);

        if (genreSet === genre.toLowerCase()) {

          option[option.length - 1].selected = true;
        }
      });

      //
      return select;
    },

    //
    filterItems: function(page) {

      var params = {
      	page: 1,
        genre: this.selectedGenre = this.$el.find('.genre').val(),
        title: this.$el.find('.search').val()
      };

      if (!isNaN(page) && page > 0) {

      	params.page = page;
      }

      this.trigger('filterItems', params);
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