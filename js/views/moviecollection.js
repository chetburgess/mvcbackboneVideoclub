define([
    'jquery',
    'underscore',
    'backbone',
    'views/moviecollectionitem',
    'collections/movie'
], function($, _, Backbone, MovieCollectionItemView, MovieCollection) {
        
    // CartCollectionView es un clase, que al inicializarce:
    // 1. Instancia la collection a listarse
    // 2. Instancia la view para cada model de la collection
    var MovieCollectionView = Backbone.View.extend({
        events: {
            'button .add': 'addItem',
            'select .filter': 'filterItems'
        },
        initialize: function(items) {
            
            this.collection = new MovieCollection([]);
            this.collection.fetch();
                                  
            this.itemView = new MovieCollectionItemView(this.collection);
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