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
        'select .filter': 'filterItems'
    },

    //
    initialize: function () {

      // @NOTE la collection se adjunta automaticamente
      // Agreganis listeners
      this.collection.on('add', this.addMovie, this);
      this.collection.on('remove', this.removeMovie, this);
      this.collection.on('reset', this.onCollectionReset, this);
    },

    //
    render: function (selector) {
      var self = this;

      //
      this.$el.html(MovieCollectionHTML);
      this.$el.appendTo(selector);

      this.collection.each(function (model) {
        self.addMovie(model);
      });
    },

    // Hash para referenciar la vista de un modelo puntual
    itemsViews: {},

    // Agrega una pelicula a la grilla
    addMovie: function (model) {

      var itemView = new MovieCollectionItemView({model: model});
      itemView.render('#list-container');

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
    onCollectionReset: function () {
      var itemView;

      //
      // @NOTE Tranquilamente podriamos borrar todas y crear solo las
      // que estan en la collection, pero para este caso no es necesario

      // Ocultamos todas las views
      for (itemView in this.itemsViews) {
        this.displayItemView(itemView, false);
      }

      // Vemos cuales son las peliculas en la collection
      _.each(this.collection, function (model) {

        // Si la pelicula no esta cargada
        if (!this.itemsViews[model.id]) {

          // La agregamos
          this.addMovie(model);
        }
        else {

          // La mostramos
          this.displayItemView(itemView, true);
        }
      }, this);
    },

    //
    filterItems: function(e) {
      
      e.preventDefault();
      this.itemView.filterByGenre();
    }
  });

  return MovieCollectionView;
});