define([
  'jquery',
  'underscore',
  'backbone',
  'modals',
  'text!/templates/movie/movieCollectionItem.html',
], function($, _, Backbone, Modals, MovieCollectionItemHTML) {
  
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

      // Solicitamos confirmacion
      Modals.confirm({
        message: 'Estas seguro que no vas a ver mas la pelicula "' + this.model.get('title') + '"?',
        accept: function () {

          // Destruimos el modelo
          self.model.destroy({
            headers: {
              'IF-Match': self.model.get('_rev')
            },
            dataType: 'text/json',
            // Si el modelo se elimino con exito
            success: function () {

              // Eliminamos la vista
              self.remove();
            },
            error: function () {

              // @TODO mostrar error
            }
          });
        }
      });
    }
  });

  return MovieCollectionItemView;
});