define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
    //'views/moviecollectionitem'
], function($, _, Backbone, Handlebars, MovieCollectionItemView) {
        
    // CartCollectionView es un clase, que al inicializarce:
    // 1. Instancia la collection a listarse
    // 2. Instancia la view para cada model de la collection
    var MovieCollectionView = Backbone.View.extend({
        el: '#movie-collection-container',
        templateSelector: '#movie-list',
        events: {
            'button .add': 'addItem',
            'select .filter': 'filterItems'
        },
        initialize: function(movies) {
            
            // @TODO Ver si es necesario
            this.collection = movies;
            
            //
            //this.itemView = new MovieCollectionItemView(movies);

            var source   = $(this.templateSelector).html();
            this.template = Handlebars.compile(source);
        },
        
        // Avisa a quien este escuchando de se quiere cargar un nuevo item
        addItem: function(e) {
            
            e.preventDefault();
            this.trigger('addMovie');
        },
        filterItems: function(e) {
            
            e.preventDefault();
            this.itemView.filterByGenre();
        },
        render: function(){
          this.$el.html(this.template({'movies':this.collection.toJSON()}));
          return this;
      },
    });
    return MovieCollectionView;
});