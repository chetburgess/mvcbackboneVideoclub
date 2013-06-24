define([
  'jquery',
  'underscore',
  'backbone',
  'modals',
  'collections/movies',
  'views/moviesCollection',
  'views/moviesForm',
  'views/moviesDetail',
  'eventHandlers/moviesHandler'
],
function ($, _, Backbone, Modals, MoviesCollection, MoviesColllectionView, MoviesFormView, MoviesDetailView, MoviesHandler) {

  //
  var collection = new MoviesCollection([]);

  // MoviesRouter, es una clase que mapea la URL para convertirlas en acciones
  // y dispara eventos cuando "coincide"
  var MoviesRouter = Backbone.Router.extend({
    routes: {
      'movies': 'showCollectionView',
      'movies/detail/:id': 'showDetailView',
      'movies/new': 'showFormView',
      'movies/edit/:id': 'showFormView'
    },

    //
    initialize: function () {

      this.listenTo(MoviesHandler, 'moviesItemView:confirmRemove', _.bind(this.confirmRemove, this));
      this.listenTo(MoviesHandler, 'moviesCollectionView:filter', _.bind(this.filter, this));
      this.listenTo(MoviesHandler, 'moviesFormView:save', _.bind(this.save, this));
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
      var view = this.views['collection'];

      // Si no esta
      if (!view) {

        // Instanciamos
        view = new MoviesColllectionView({collection: collection});

        // Renderizamos
        $('#main').append(view.render().el);
      }

      //
      this.filter();

      //
      this.views['collection'] = view;

      // Cambiamos a esta vista
      this.toggleView('collection');
    },

    prevFilterParams: {},
    filter: function (view, params) {

      if (!params) {
        params = this.prevFilterParams;
      }
      else {
        this.prevFilterParams = params;
      }
      collection.remove(collection.models);
      collection.fetch({data: params});
    },

    confirmRemove: function (view) {

      // Solicitamos confirmacion
      Modals.confirm({
        message: 'Estas seguro de eliminar la pelicula "' + view.model.get('title') + '"?',
        accept: function () {

          // Destruimos el modelo
          view.model.destroy({
            // Si el modelo se elimino con exito
            success: function () {

              // Avisamos
              Modals.success({
                message: 'La pelicula fue eliminada con exito!'
              });
            },
            error: function () {

              // @TODO mostrar error

              // Avisamos
              Modals.error({
                message: '',
                close: function () {

                  //@TODO ver si es necesario hacer algo
                }
              });
            }
          });
        }
      });
    },

    // Instancia, si no estuviese previamente creada, y renderiza
    // la vista MoviesDetailView
    // Si no existiera una pelicula asociada al id, salta al listado
    showDetailView: function (id) {

      var success = $.proxy(function (model) {
        var view = this.views['detail'];

        // Si ua existe
        if (!!view) {

          // Destruimos
          view.remove();
        }

        // Instanciamos
        view = new MoviesDetailView({model: model});

        // Renderizamos
        $('#main').append(view.render().el);

        //
        this.views['detail'] = view;

        // Cambiamos a esta vista
        this.toggleView('detail');
      }, this);

      // Validamos que la pelicula exista
      this.validate(id)
        .done(success);
    },

    // Instancia, si no estuviese previamente creada, y renderiza
    // la vista MoviesFormView
    // Si no existiera una pelicula asociada al id, salta al listado
    showFormView: function (id) {

      var success = $.proxy(function (model) {
        var view = this.views['form'];

        // Si esta
        if (!!view) {

          // Destruimos
          view.remove();
        }

        if (!model){
          model = new collection.model({});
        }

        // Instanciamos
        view = new MoviesFormView({
          collection: collection
          , model: model
        });

        // Renderizamos
        $('#main').append(view.render().el);

        //
        this.views['form'] = view;

        // Cambiamos a esta vista
        this.toggleView('form');
      }, this);

      // Si pasamos un id
      if (!!id) {

        // Validamos que la pelicula exista
        this.validate(id)
          .done(success);
      }
      else {
        success(false);
      }
    },

    save: function (model, attrs) {
      var self = this,
        add = !model.id;

      // Guardamos
      model.save(attrs)
        .done( function () {
          // Avisamos
          Modals.success({
            message: 'La pelicula fue ' + (add? 'cargada' : 'actualizada') + ' con exito!',
            close: function () {

              self.navigate('movies', {trigger: true});
            }
          });
        })
        .fail( function (response) {
          var msg = 'Ha ocurrido un error.<br />Por favor, recarge pa pagina.';

          //@TODO Ver de centralizar este analisis
          if (xhr.status === 409) {
            msg = 'El registro ya ha sido actualizada por otro usuario.<br />Actualice la p&aacute;gina para ver los nuevos datos.';
          }

          // 
          Modals.error({
            message: msg
          });
        });
    },

    //
    validate: function (id) {
      
      var model = new collection.model({_id: id}),
        dfd = jQuery.Deferred();

      $.when(model.fetch())
        .done( function (response) {

          //
          dfd.resolve(model);
        })
        .fail(_.bind(function () {
          
          dfd.reject(model);

          // Mostramos el listado
          this.navigate('movies', {trigger: true});
        }, this));

      return dfd.promise();
    }
  });

  return MoviesRouter;
});
