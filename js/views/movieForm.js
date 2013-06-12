define([
  'jquery',
  'underscore',
  'backbone',
  'modals',
  'text!/templates/movie/movieForm.html'
], function($, _, Backbone, Modals, MovieFormHTML) {
  
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
        , add = !model
        , self = this; // Si no se paso un modelo

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

      // Guardamos
      model.save(attrs, {
        success: function (mod, xhr, opt) {

          //self.collection.add([mod]); //@TODO ver si es necesario

          // Solicitamos confirmacion
          Modals.success({
            message: 'La pelicula fue ' + (add? 'cargada' : 'actualizada') + 'con exito!',
            close: function () {

              //@TODO tenemos que volver a la vista del listado
            }
          });
        },
        error: function (mod, xhr, opt) {

          var msg = 'Ha ocurrido un error.<br />Por favor, recarge pa pagina.';

          //@TODO Ver de centralizar este analisis
          if (xhr.status === 409) {
            msg = 'La pelicula ya ha sido actualizada por otro usuario.<br />Actualice la p&aacute;gina para ver los nuevos datos.';
          }

          // 
          Modals.error({
            message: msg,
            close: function () {

              //@TODO ver si es necesario hacer algo
            }
          });
        }
      });

      evt.preventDefault();

      return false; // Evitamos que se recarge la pagina
    }
  });

  return MovieFormView;
});