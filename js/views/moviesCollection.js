define([
  'underscore',
  'backbone',
  'text!/templates/movies/collection.html',
  'views/moviesCollectionItem',
  'views/paginatorView',
  'eventHandlers/moviesHandler'
], function(_, Backbone, MoviesCollectionHTML, MoviesCollectionItemView, PaginationView, MoviesHandler) {
  
  // MovieCollectionView es un clase que representa la vista de
  // la pelicula completa del listado de peliculas
  var MoviesCollectionView = Backbone.View.extend({
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

      // Agregamos listeners
      this.listenTo(this.collection, 'sync', _.bind(this.renderCollection, this));

      //
      this.paginationView = new PaginationView({collection: this.collection});
      this.listenTo(this.paginationView, 'changePage', _.bind(this.filterItems, this));
    },

    //
    render: function () {
      
      this.$el.html(MoviesCollectionHTML);
      this.$el.find('.pagination-container').append(this.paginationView.render().el);

      return this;
    },

    // Agrega una pelicula a la grilla
    addMovie: function (model) {

      var itemView = new MoviesCollectionItemView({model: model});

      //
      this.$el.find('.list-container').append(itemView.render().el);
    },

    // Cuando se reset-ea la collection, recargamos todas las peliculas
    renderCollection: function () {
      
      // Vemos cuales son las peliculas en la collection
      _.each(this.collection.models, function (model) {

          // La agregamos
          this.addMovie(model);
      }, this);

      //
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
    filterItems: function (page) {

      var params = {
        page: 1,
        genre: this.selectedGenre = this.$el.find('.genre').val(),
        title: this.$el.find('.search').val()
      };

      if (!isNaN(page) && page > 0) {

        params.page = page;
      }

      MoviesHandler.trigger('moviesCollectionView:filter', this, params);
      return false;
    },

    //
    doSearch: function () {

      this.filterItems(1);
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