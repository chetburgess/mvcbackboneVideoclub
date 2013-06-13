define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/movie/movieCollection.html',
  'views/movieCollectionItem',
  'views/paginatorView'
], function($, _, Backbone, MovieCollectionHTML, MovieCollectionItemView, PaginationView) {
  
  // MovieCollectionView es un clase que representa la vista de
  // la pelicula completa del listado de peliculas
  var MovieCollectionView = Backbone.View.extend({
    // Idicamos que queremos se cree dentro de un div
    tagName: 'div',
    className: 'span12 hide',
    itemListSelector: '.list-container',

    //
    events: {
      'change .genre': 'filterItems',
      'click .doSearch': 'filterItems',
      'keypress .search': 'matchEnter'
    },

    //
    initialize: function () {

      // @NOTE la collection se adjunta automaticamente
      // Agregamos listeners
      this.collection.on('sync', this.loadColletionComponent, this);
      this.paginationView = new PaginationView({
                                  collection: this.collection,
                                  getFilterParams: $.proxy(this,'getFilterParams')
                                });
      this.doFetch();
    },

    //
    render: function () {
      
      this.$el.html(MovieCollectionHTML);

      return this;
    },
    doFetch: function(){
      this.collection.fetch({
        dataType: 'jsonp',
        data: this.getFilterParams()
      });
    },

    // Hash para referenciar la vista de un modelo puntual
    itemsViews: {},

    // Agrega una pelicula a la grilla
    addMovie: function (model) {

      var itemView = new MovieCollectionItemView({model: model});
      this.$el.find(this.itemListSelector).append(itemView.render().el);

      // Guardamos un la view del modelo
      this.itemsViews[model.id] = itemView;
    },

    // Muestra/Oculta la view de una pelicula en la grilla
    displayItemView: function (itemView, show) {

      itemView.$el[show? 'removeClass' : 'addClass']('hide');
    },

    dispalyLoading: function (show) {
      
      this.$el.find(this.itemListSelector).children().first()[show? 'removeClass':'addClass']('hide');
    },

    // Cuando se reset-ea la collection, recargamos todas las peliculas
    showMovies: function () {
      var id;

      this.dispalyLoading(false);
      
      // Eliminamos todas las vistas de los modelos
      for (id in this.itemsViews) {

        this.itemsViews[id].remove();
        delete this.itemsViews[id];
      }
      this.itemsViews = {};

      // Vemos cuales son las peliculas en la collection
      _.each(this.collection.models, function (model) {

          // La agregamos
          this.addMovie(model);
      }, this);

      // Creamos las opciones del select
      this.setGenreFilter();
    },
    loadColletionComponent: function(){
      this.showPagination();
      this.showMovies();
    },

    showPagination: function(){
      
      this.$el.find('.pagination-container').append(this.paginationView.render().el);
    },

    getFilterParams: function(){
      return {
        'genre': this.$el.find('.genre').val(),
        'title': this.$el.find('.search').val()
      }
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
    filterItems: function() {

      var self = this,
        title;

      this.selectedGenre = this.$el.find('.genre').val();
      title = this.$el.find('.search').val();

      //
      this.dispalyLoading(false);
      this.collection.pageNumber = 1;
      //
      this.collection.fetch({
        dataType: 'jsonp',
        data: {genre: this.selectedGenre, title: title}
      });

      return false;
    },

    // Si 
    matchEnter: function (evt) {

      if (evt.keyCode === 13) {
        this.filterItems();
      }
    }
  });

  return MovieCollectionView;
});