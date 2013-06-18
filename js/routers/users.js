define([
  'jquery',
  'underscore',
  'backbone',
  'modals',
  'collections/user',
  'views/userCollection',
  'views/userForm',
  'views/userDetail'
],
function ($, _, Backbone, Modals, UserCollection, UserColllectionView,
          UserFormView, UserDetailView) {

  //
  var UserCollection = new UserCollection([]);

  // UserRouter, es una clase que mapea la URL para convertirlas en acciones
  // y dispara eventos cuando "coincide"
  var UserRouter = Backbone.Router.extend({
    routes: {
      'users': 'showCollectionView',
      'users/detail/:id': 'showDetailView',
      'users/new': 'showFormView',
      'users/edit/:id': 'showFormView'
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
    // la vista UserColllectioView
    showCollectionView: function () {
      // Si no esta
      if (!this.views['collection']) {

        // Instanciamos
        this.views['collection'] = new UserColllectionView({collection: UserCollection});

        // Renderizamos
        $('#main').append(this.views['collection'].render().el);
      }

      //
      this.views['collection'].doFetch();

      // Cambiamos a esta vista
      this.toggleView('collection');
    },

    // Instancia, si no estuviese previamente creada, y renderiza
    // la vista UserDetailView
    // Si no existiera una pelicula asociada al id, salta al listado
    showDetailView: function (id) {

      var success = $.proxy(function (model) {

          // Si ua existe
          if (!!this.views['detail']) {

            // Destruimos
            this.views['detail'].remove();
          }

          // Instanciamos
          this.views['detail'] = new UserDetailView({model: model});

          // Renderizamos
          $('#main').append(this.views['detail'].render().el);

          // Cambiamos a esta vista
          this.toggleView('detail');
      }, this);

      // Validamos que la pelicula exista
      this.validateUser(id, success);
    },

    // Instancia, si no estuviese previamente creada, y renderiza
    // la vista UserFormView
    // Si no existiera una pelicula asociada al id, salta al listado
    showFormView: function (id) {

      var success = $.proxy(function (model) {

        // Si esta
        if (!!this.views['form']) {

          // Destruimos
          this.views['form'].remove();
        }

        if (!model){
          model = new UserCollection.model({});
        }

        // Instanciamos
        this.views['form'] = new UserFormView({
          collection: UserCollection
          , model: model
        });

        this.views['form'].listenTo(this.views['form'].model,'sync',$.proxy(function(){
          this.navigate('', {trigger: true});
        },this));

        // Renderizamos
        $('#main').append(this.views['form'].render().el);

        // Cambiamos a esta vista
        this.toggleView('form');
      }, this);

      // Si pasamos un id
      if (!!id) {

        // Validamos que la pelicula exista
        this.validateUser(id, success);
      }
      else {
        success(false);
      }
    },

    //
    validateUser: function (id, callback) {
      
      var model = new UserCollection.model({_id: id}),
        error = $.proxy(function () {
          
          // Mostramos el listado
          this.navigate('', {trigger: true});
        }, this);



      // Buscamos los datos de la pelicula
      model.fetch({
       success: function (model, resp, options) {
          model.once('sync', function(model){
            callback(model);
          },this);        
        },
        error: error
      });

    }
  });

  var User = {
    initialize: function () {
      
      // Instanciamos
      var UserRouter = new UserRouter();
    }
  };

  return User;
});
