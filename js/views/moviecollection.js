// NO USAR ESTE, BORRAR!!!

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/movie.js'
    'text!templates/movie/moviecollection'    
    //'views/moviecollectionitem'
], function($, _, Backbone, MovieCollection, MovieCollectionTemplate) {
        
    // CartCollectionView es un clase, que al inicializarce:
    // 1. Instancia la collection a listarse
    // 2. Instancia la view para cada model de la collection
    var MovieCollectionView = Backbone.View.extend({
        events: {
            'button .add': 'addItem',
            'select .filter': 'filterItems'
        },
        initialize: function(movies) {
            
            // @TODO Ver si es necesario
            //this.collection = movies;

            // @ Respuesta a comentario anterios, yo (javo) lo vi puesto asi directamente:
            MovieCollection.fetch();
            
            //
            //this.itemView = new MovieCollectionItemView(movies);
        },

        render: function(){

            data = {movies: MovieCollection.toJSON()}

            var compiledTemplate = _.template( MovieCollectionTemplate, data );
             $('#main').append(compiledTemplate);


        }
        
        // Avisa a quien este escuchando de se quiere cargar un nuevo item
        addItem: function(e) {
            
            e.preventDefault();
            this.trigger('addMovie');
        },
        filterItems: function(e) {
            
            e.preventDefault();
            this.itemView.filterByGenre();
        }
    });
    return MovieCollectionView;
});