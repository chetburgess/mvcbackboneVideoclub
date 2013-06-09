define([
  'underscore',
  'backbone',
  'localstorage'
], function(_, Backbone,LocalStorage) {

    var Movie = Backbone.Model.extend({
      localStorage: new LocalStorage('Movies'),
      defaults: {
            title: '',
            year: 0,
            genre: '',
            poster: '',
            rating: 1
        }, 

        initialize: function( options ) {
            //this.query = options.query; 
            this.on("invalid",function(model,error){
                alert(error);
            });

        },

        validate: function (attrs) {
            var year = new Date().getFullYear();
            //@TODO if error is an array, add items using push method
            var error = [];

            if (!attrs.title.trim()) {
                error.title = 'Tenes que ingresar el titulo de la pelicula';
            }
            if (!attrs.year || Number(attrs.year) > year) {
                error.year = 'El a&ntilde,o de la pelicula debe ser menor o igual a '+year;
            }
            if (!attrs.genre.trim()) {
                error.genre = 'Tenes que ingresar el genero de la pelicua';
            }
            if (attrs.rating<1 || attrs.rating>5) {
                error.rating = 'La puntuacion de la pelicula debe estar entre 1 y 5';
            }

            if (error.length > 0) {
                return error;
            }
        }

    });

    return Movie;

});

