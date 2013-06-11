define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/movie/movieCollection.html',
  'views/movieCollectionItem'
], function($, _, Backbone, MovieCollectionHTML, MovieCollectionItemView) {
  
  // MovieCollectionView es un clase que representa la vista de
  // la pelicula completa del listado de peliculas
  var MovieCollectionView = Backbone.View.extend({
    // Idicamos que queremos se cree dentro de un div
    tagName: 'div',
    className: 'span12 hide',

    //
    events: {
        'change .genre': 'filterItems'
    },

    //
    initialize: function () {

      // @NOTE la collection se adjunta automaticamente
      // Agregamos listeners
      //this.collection.on('add', this.addMovie, this);
      this.collection.on('remove', this.removeMovie, this);
      this.collection.on('reset', this.showMovies, this);
      this.collection.on('sync', this.showMovies, this);
    },

    //
    render: function () {
      
      this.$el.html(MovieCollectionHTML);
      this.collection.each($.proxy(this, 'addMovie'));
      return this;
    },

    // Hash para referenciar la vista de un modelo puntual
    itemsViews: {},

    // Agrega una pelicula a la grilla
    addMovie: function (model) {

      var itemView = new MovieCollectionItemView({model: model});
      this.$el.find('#list-container').append(itemView.render().el);

      // Guardamos un la view del modelo
      this.itemsViews[model.id] = itemView;
    },

    // Elimina una pelicula de la grilla
    removeMovie: function (model) {

      // Borramos la referencia a la pelicula
      delete this.itemsViews[model.id];
    },

    // Muestra/Oculta la view de una pelicula en la grilla
    displayItemView: function (itemView, show) {

      itemView.$el[show? 'removeClass' : 'addClass']('hide');
    },

    // Cuando se reset-ea la collection, recargamos todas las peliculas
    showMovies: function () {
      var itemView;

      //
      // @NOTE Tranquilamente podriamos borrar todas y crear solo las
      // que estan en la collection, pero para este caso no es necesario

      // Ocultamos todas las views
      for (itemView in this.itemsViews) {
        this.displayItemView(this.itemsViews[itemView], false);
      }

      // Vemos cuales son las peliculas en la collection
      _.each(this.collection.models, function (model) {

        // Si la pelicula no esta cargada
        if (!this.itemsViews[model.id]) {

          // La agregamos
          this.addMovie(model);
        }
        else {

          // La mostramos
          this.displayItemView(this.itemsViews[model.id], true);
        }
      }, this);

      this.setGenreFilter();
    },

    // Genero seleccionado
    selectedGenre: 'all',

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
        value: 'all',
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
      
      this.selectedGenre = this.$el.find('.genre').val(),
      
      _.each(this.collection.models, function (model) {
        var show = false;

        if (this.selectedGenre === 'all' || model.get('genre').toLowerCase() === this.selectedGenre) { 
          show = true;
        }

        this.displayItemView(this.itemsViews[model.id], show);
      }, this);

      return false;
    }
  });

  return MovieCollectionView;
});