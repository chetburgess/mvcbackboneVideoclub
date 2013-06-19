define([
  'jquery',
  'underscore',
  'backbone',
  'modals',
  'text!/templates/movies/form.html'
], function($, _, Backbone, Modals, MoviesFormHTML) {
  
  // MoviesFormView es un clase que representa la vista de
  // la pelicula completa del listado de peliculas
  var MoviesFormView = Backbone.View.extend({
    // Idicamos que queremos se cree dentro de un div
    tagName: 'div',
    className: 'span12',

    //
    events: {
      'submit .movie-form': 'saveMovie',
      'change .poster': 'posterSelected'
    },

    // Guardamos el template compilado para reutilizar
    template: _.template(MoviesFormHTML),
    render: function () {
      
      this.$el.html(this.template({model: this.model}));
      return this;
    },
    
    // Guardamos los cambios en el modelo
    saveMovie: function (evt) {
      
      var attrs = {},
        add = !this.model.id; // si no esta seteado el id, es porque es una pelicula nueva

      // Buscamos los inputs y obtenemos el valor
      $(evt.target).find(':input').not('button').each(function () {

        var el = $(this);
        attrs[el.attr('name')] = el.val();
      });
      attrs.rating = Number(attrs.rating);
      attrs.year = Number(attrs.year);

      // Guardamos
      this.model.save(attrs, {
        success: function (model, xhr, opt) {

          // Avisamos
          Modals.success({
            message: 'La pelicula fue ' + (add? 'cargada' : 'actualizada') + ' con exito!'
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
            message: msg
          });
        }
      });

      evt.preventDefault();

      return false; // Evitamos que se recarge la pagina
    },

    posterSelected: function (evt) {
      var files = evt.target.files, // FileList object
        file = files[0],
        reader;

      // Si hay un archivo y si es una imagen
      if (!!file && file.type.match('image.*')) {

        // Si tenia poster
        if (this.model.get('poster') !== '') {

          // Borramos el poster anterior
          this.model.set('poster', '');

          //
          this.$el.find('.poster-img').addClass('hide'); // Ocultamos
        }

        //
        this.$el.find('.poster').addClass('hide'); // Ocultamos
        this.$el.find('.poster-loader').removeClass('hide'); // Mostramos

        // Creamos un reader
        reader = new FileReader();

        // Si el archivo se cargo con exito
        reader.onload = $.proxy(function (e) {

          // Guardamos el nuevo poster
          this.model.set('poster', e.target.result);

          // Seteamos el src para ver la imagen
          this.$el.find('.poster-img').attr('src', e.target.result);

          this.$el.find('.poster-loader').addClass('hide'); // Ocultamos
          this.$el.find('.poster-img').removeClass('hide'); // Mostramos
          this.$el.find('.poster').removeClass('hide'); // Mostramos

        }, this);

        // Si el archivo no se cargo con exito
        reader.onerror = $.proxy(function () {

          this.$el.find('.poster-loader').addClass('hide'); // Ocultamos
          this.$el.find('.poster').removeClass('hide'); // Mostramos

          //
          Modals.error({message: 'Ha ocurrido un error al intentar cargar el archivo'});
        }, this);

        // Comenzamos la carga del archivo
        reader.readAsDataURL(file);
      }
      else {
        
        Modals.error({message: 'El archivo ingresado no es una imagen'});
      }
    }
  });

  return MoviesFormView;
});