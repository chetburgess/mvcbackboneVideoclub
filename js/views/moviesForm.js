define([
  'underscore',
  'backbone',
  'text!/templates/movies/form.html'
], function(_, Backbone, MoviesFormHTML) {
  
  // MoviesFormView es un clase que representa la vista de
  // la pelicula completa del listado de peliculas
  var MoviesFormView = Backbone.View.extend({
    // Idicamos que queremos se cree dentro de un div
    tagName: 'div',
    className: 'span12',

    //
    events: {
      'submit .movie-form': 'saveMovie',
      'change .poster': 'uploadPoster'
    },

    // Guardamos el template compilado para reutilizar
    template: _.template(MoviesFormHTML),
    render: function () {
      
      this.$el.html(this.template({model: this.model}));
      return this;
    },
    
    // Guardamos los cambios en el modelo
    saveMovie: function (evt) {
      
      var attrs = {};

      // Buscamos los inputs y obtenemos el valor
      $(evt.target).find(':input').not('button').each(function () {

        var el = $(this);
        attrs[el.attr('name')] = el.val();
      });

      //
      this.trigger('saveMovie', this.model, attrs);

      //
      evt.preventDefault();
      return false; // Evitamos que se recarge la pagina
    },

    uploadPoster: function (evt) {
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