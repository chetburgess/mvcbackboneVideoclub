define([
  'jquery',
  'underscore',
  'backbone',
  'collections/movie',
  'views/movieCollection',
  'views/movieForm',
  'views/movie'
],
function ($, _, Backbone, MovieCollection, MovieColllectionView, MovieFormView, MovieDetailView) {

  //
  var movieCollection = new MovieCollection([]);
  movieCollection.fetch();

  // MovieRouter, es una clase que mapea la URL para convertirlas en acciones
  // y dispara eventos cuando "coincide"
  var MovieRouter = Backbone.Router.extend({
    routes: {
      // Las acciones no agregan "Movie", por que el rotuer es "Movie"
      '': 'showCollectionView',
      'movies/detail/:id': 'showDetailView',
      'movies/new': 'showFormView',
      'movies/edit/:id': 'showFormView'
    },

    // Referencia para la vista actual
    currentView: null,

    // Oculta (add className hide), si estuviera, la vista actual
    // y muestra (remove className hide) la view indicada
    toggleView: function (viewName) {

      // Si hay una view mostrandose
      if (!!this.currentView) {
        this.currentView.$el.addClass('hide');
      }

      // Mostramos la vista indicada
      this.views[viewName].$el.removeClass('hide');

      // Indicamos la vista en curso
      this.currentView = this.views[viewName];
    },

    // Hash de vistas cargadas
    views: {},

    // Instancia, si no estuviese previamente creada, y renderiza
    // la vista MovieColllectioView
    showCollectionView: function () {

      // Si no esta
      if (!this.views['collection']) {

        // Instanciamos
        this.views['collection'] = new MovieColllectionView({collection: movieCollection});

        // Renderizamos
        $('#main').append(this.views['collection'].render().el);
      }

      // Cambiamos a esta vista
      this.toggleView('collection');
    },

    // Instancia, si no estuviese previamente creada, y renderiza
    // la vista MovieDetailView
    // Si no existiera una pelicula asociada al id, salta al listado
    showDetailView: function (id) {

      // Controlamos que el modelo este en la collection
      var model = movieCollection.get(id);
      if (!!model) {

        // Si no esta
        if (!this.views['detail']) {

          // Instanciamos
          this.views['detail'] = new MovieDetailView({model: model});

          // Renderizamos
          $('#main').append(this.views['detail'].render().el);
        }

        // Cambiamos a esta vista
        this.toggleView('detail');
      }
      else {

        // Si no esta mostramos el listado
        this.navigate('', {trigger: true});
      }
    },

    // Instancia, si no estuviese previamente creada, y renderiza
    // la vista MovieFormView
    // Si no existiera una pelicula asociada al id, salta al listado
    showFormView: function (id) {

      var model = false; // Estado del formulario

      // Si pasamos un id
      if (!!id) {

        // Controlamos que el modelo este en la collection
        model = movieCollection.get(id);
        if (!model) {

          // Lo enviamos la vista del listado
          this.navigate('', {trigger: true});

          return false; // @TODO ver que esto no afecte de alguna forma
        }
      }

      // Si esta
      if (!!this.views['form']) {

        // Destruimos
        this.views['form'].remove();
      }

      // Instanciamos
      this.views['form'] = new MovieFormView({
        collection: movieCollection
        , model: model
      });

      // Renderizamos
      $('#main').append(this.views['form'].render().el);

      // Cambiamos a esta vista
      this.toggleView('form');
    }
  });

  var app = {
    initialize: function () {

      // Instanciamos
      var movieRouter = new MovieRouter();

      // Agregamos listener (para el alta/modificacion)
      movieCollection.on('sync', function () {

        this.navigate('', {trigger: true});
      }, movieRouter);

      // Iniciamos
      Backbone.history.start();
    }
  };

  return app;
});
