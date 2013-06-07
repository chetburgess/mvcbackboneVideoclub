define([
    'jquery',
    'underscore',
    'backbone',
    //'views/moviecollectionitem'
], function($, _, Backbone, MovieCollectionItemView) {
        
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
            this.collection = movies;
            
            //
            //this.itemView = new MovieCollectionItemView(movies);
        },
        
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