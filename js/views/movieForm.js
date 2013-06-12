define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/movie/movieForm.html'
], function($, _, Backbone, MovieFormHTML) {
  
  // MovieFormView es un clase que representa la vista de
  // la pelicula completa del listado de peliculas
  var MovieFormView = Backbone.View.extend({
    // Idicamos que queremos se cree dentro de un div
    tagName: 'div',
    className: 'span12',

    //
    events: {
      'submit .movie-form': 'saveMovie'
    },

    // Guardamos el template compilado para reutilizar
    template: _.template(MovieFormHTML),
    render: function () {
      this.$el.html(this.template({model: this.model}));
      return this;
    },
    
    // Guardamos los cambios en el modelo
    saveMovie: function (evt) {
      var attrs = {}
        , model = this.model 
        , add = !model; // Si no se paso un modelo

      // Buscamos los inputs y obtenemos el valor
      $(evt.target).find(':input').not('button').each(function () {

        var el = $(this);
        attrs[el.attr('name')] = el.val();
      });
      attrs.rating = Number(attrs.rating);
      attrs.year = Number(attrs.year);

      // Si es nuevo
      if (add) {
        
        model = new this.collection.model({});
      }

      //mode.on('invalid') //@TODO
      
      // Guardamos
      model.save(attrs, {
        success: function () {

          if (add) {
            this.collection.add([model]);
          }
        },
        error: function (resp) {
          // @TODO
        }
      });

      return false; // Evitamos que se recarge la pagina
    }
  });

  return MovieFormView;
});