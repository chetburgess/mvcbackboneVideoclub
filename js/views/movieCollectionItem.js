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
      this.model.on('remove', this.updateMove, this);
    },

    // Guardamos el template compilado para reutilizar
    template: _.template(MovieCollectionItemHTML),
    render: function () {
      
      this.$el.html(this.template({model: this.model}));
      return this;

    },

    //
    updateMove: function () {

    	this.$el.html(this.template({model: this.model}));
    },

    // Eliminar la pelicula
    removeMovie: function() {
      var self = this;

      
      if (confirm('Estas seguro que no vas a ver mas la pelicula "' + this.model.get('title') + '"?')) {

      	this.model.destroy({
          headers: {
            'IF-Match': this.model.get('_rev')
          },
          dataType: 'text/json',
          success: function () {
            self.remove();
          },
          scope: this
        });
      }
    }
  });

  return MovieCollectionItemView;
});