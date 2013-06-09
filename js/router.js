define([
    'jquery',
    'underscore',
    'backbone',
    'collections/MovieCollection',
    'views/moviecollection',
    'views/movieformview'
],
function ($, _, Backbone, MovieCollection, MovieColllectionView, MovieFormView) {
    
    var movieCollection = new MovieCollection([]);
    movieCollection.fetch();
    console.log(movieCollection.pluck('title'));
    
    // MovieRouter, es una clase que mapea la URL para convertirlas en acciones
    // y dispara eventos cuando "coincide"
    var MovieRouter = Backbone.Router.extend({
        routes: {
            // Las acciones no agregan "Movie", por que el rotuer es "Movie"
            '': 'showCollectionView',
            'movies/detail/:id': 'showDetailView',
            'movies/new': 'showFormView', // @TODO ver si usamos "addMovie" en su lugar o da igual
            'movies/edit/:id': 'showFormView'
        },
        
        // Indicardor para la vista actual
        currentView: null,
        
        // Oculta (add className hidden), si estuviera setea, la vista actual
        hideCurrentView: function () {
            
            // Si esta seteado
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
            
            // Si no esta instanciada
            if (!this.moviesCollectionView) {
                
                // Instanciamos
                this.moviesCollectionView = new MovieColllectionView(movieCollection);
                
                // Agregamos listeners
                this.moviesCollectionView.on('addMovie', 'addMovie', this);
                
                // Renderizamos
                this.moviesCollectionView.render();
            }
            else {
                
                // Mostramos la vista (que pudiera estar oculta)
                this.showView(this.moviesCollectionView);
            }
            
            // La seteamos como la vista acutal
            this.currentView = this.moviesCollectionView;
            
            //
            this.navigate('');
        },
        
        // Instancia, si no estuviese previamente creada, y renderiza
        // la vista MovieDetailView
        // Si no existiera una pelicula asociada al id, salta al listado
        showDetailView: function (id) {
            
            // Controlamos que el modelo este en la collection
            var model = movieCollection.get(id);
            if (!!model) {
                    
                // Ocultamos la vista
                this.hideCurrentView();
                
                // Si no esta, instanciamos
                if (!this.movieDetailView) {
                    
                    this.movieDetailView = new MovieDetailView();
                    
                    // Agregamos listeners
                    this.movieDetailView.on('backward', 'showCollectionView');
                    
                    // Renderizamos
                    this.movieDetailView.render();
                }
                
                // Mostramos la vista (que pudiera estar oculta)
                this.showView(this.movieDetailView);
                
                // La seteamos como la vista acutal
                this.currentView = this.movieDetailView;
                
                //
                this.navigate('movies/detail/' + id);
            }
            else {
                
                // Si no esta mostramos el listado
                this.showCollectionView();
            }
        },
        movieSaved: function(res, res2){
//debugger;
        },
        // Instancia, si no estuviese previamente creada, y renderiza
        // la vista MovieFormView
        // Si no existiera una pelicula asociada al id, salta al listado
        showFormView: function (id) {
            var model, 
                editing = true, // Estado del formulario
                nav = 'edit/' + id; // Donde navegar
            
            // Si pasamos un id
            if (!!id) {
                
                // Controlamos que el modelo este en la collection
                model = movieCollection.get(id);
                if (!model) {
                    
                    // Lo enviamos la vista del listado
                    this.showCollectionView();
                    
                    return false; // @TODO ver si esto afecta de alguna forma
                }
            }
            else {
                
                editing = false;
                nav = 'new';
                model = new movieCollection.model();
            }
            
            // Ocultamos la vista
            this.hideCurrentView();
            
            // Si no esta, instanciamos
            if (!this.movieFormView) {
                
                this.movieFormView = new MovieFormView({model: model, movieCollection: movieCollection});
                
                // Agregamos listeners
                //this.movieFormView.on('savedMovie', this.movieSaved);
                
                // Renderizamos
                this.movieFormView.render();
            }
            
            //
            // @TODO Ver como le avisamos a la vista el "cambio de estado" (editing true o false)
            //
            
            // Mostramos la vista (que pudiera estar oculta)
            this.showView(this.movieFormView);
            
            // La seteamos como la vista acutal
            this.currentView = this.movieFormView;
                
            //@TODO is this necessary?
            this.navigate('movies/' + nav);
        },
        
        addMovie: function () {
            
            this.showFormView(false);
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
