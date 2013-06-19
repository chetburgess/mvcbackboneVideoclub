define([
  'underscore',
  'backbone',
  'modals',
  'text!/templates/movies/collectionItem.html',
], function(_, Backbone, Modals, MoviesCollectionItemHTML) {
  
  // MoviesCollectionItemView es un clase que representa la vista de
  // la pelicula en la grilla (<tr>...</tr>)
  var MoviesCollectionItemView = Backbone.View.extend({
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
    template: _.template(MoviesCollectionItemHTML),
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
            // Si el modelo se elimino con exito
            success: function () {

              // Eliminamos la vista
              self.remove();

              // Avisamos
              Modals.success({
                message: 'La pelicula fue eliminada con exito!',
                close: function () {

                  //@TODO ver si es necesario hacer algo
                }
              });
            },
            error: function () {

              // @TODO mostrar error

              // Avisamos
              Modals.error({
                message: '',
                close: function () {

                  //@TODO ver si es necesario hacer algo
                }
              });
            }
          });
        }
      });
    }
  });

  return MoviesCollectionItemView;
});