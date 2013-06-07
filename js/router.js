define([
    'jquery',
    'underscore',
    'backbone',
    'views/moviecollectionview'
],
function ($, _, Backbone, MovieColllectionView) {
    
    // MovieRouter, es una clase que mapea la URL para convertirlas en acciones
    // y dispara eventos cuando "coincide"
    var MovieRouter = Backbone.Router.extend({
        routes: {
            // Las acciones no agregan "Movie", por que el rotuer es "Movie"
            '': 'showCollectionView',
            'movies/:id': 'showDetailView',
            'movies/new': 'showFormView',
            'movies/edit/:id': 'showFormView'
        },
        
        // Oculta (add className hidden), si estuviera setea, la vista actual
        hideCurrentView: function () {
            
            if (!!this.currentView) {
                this.currentView.$el.addClass('hidden');
            }
        },
        
        // Muestra (remove className hidden), la vista indicada
        showView: function (view) {
            
            view.$el.removeClass('hidden');
        },
        
        // Instancia, si no estuviese previamente creada, y renderiza
        // la vista MovieColllectioView
        showCollectionView: function () {
            
            // Ocultamos la vista
            this.hideCurrentView();
            
            // Si no esta, instanciamos
            if (!this.moviesCollectionView) {
                
                this.moviesCollectionView = new MovieColllectionView();
                
                // Agregamos listeners
                this.moviesCollectionView.on('addMovie', 'addMovie');
                
                // Renderizamos
                this.moviesCollectionView.render();
            }
            
            // Mostramos la vista (que pudiera estar oculta)
            this.showView(this.moviesCollectionView);
            
            // La seteamos como la vista acutal
            this.currentView = this.moviesCollectionView;
        },
        
        showDetailView: function () {
            
        },
        
        showFormView: function (id) {
            
        },
        
        addMovie: function () {
            
            this.showFormView();
            this.navigate('movies/new');
        }
    });
    
    var app = {
        initialize: function () {
            
            var movieRouter = new MovieRouter();
            Backbone.history.start();
        }
    };
    
    return app;
});
