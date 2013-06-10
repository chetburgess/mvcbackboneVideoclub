define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/movie/movieCollectionItem.html',
], function($, _, Backbone, MovieCollectionItemHTML) {
  
  // MovieCollectionItemView es un clase que representa la vista de
  // la pelicula en la grilla (<tr>...</tr>)
  var MovieCollectionItemView = Backbone.View.extend({
    //
    tagName: 'tr',
    
    //
    events: {
        'click button.remove': 'removeMovie'
    },

    //
    initialize: function () {
      
      // @NOTE El model se adjunta automaticamente
      // Agregamos listeners
      this.model.on('change', this.updateMove, this);
    },

    // Guardamos el template compilado para reutilizar
    template: _.template(MovieCollectionItemHTML),
    render: function (selector) {

      //
      this.$el.html(this.template({model: this.model}));
      this.$el.appendTo(selector);
    },

    //
    updateMove: function () {

    	this.$el.html(this.template({model: this.model}));
    },

    // Eliminar la pelicula
    removeMovie: function() {
      
      if (confirm('Estas seguro que no vas a ver mas la pelicula "' + this.model.get('title') + '"?')) {
      	this.model.destroy();
      	this.remove();
      }
    }
  });

  return MovieCollectionItemView;
});