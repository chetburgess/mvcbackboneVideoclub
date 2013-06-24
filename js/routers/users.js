define([
  'jquery',
  'underscore',
  'backbone',
  'modals',
  'collections/users',
  'views/usersCollection',
  'views/usersForm',
  'views/usersDetail',
  'eventHandlers/usersHandler'
],
function ($, _, Backbone, Modals, UsersCollection, UsersColllectionView, UsersFormView, UsersDetailView, UsersHandler) {

  //
  var collection = new UsersCollection([]);

  // UsersRouter, es una clase que mapea la URL para convertirlas en acciones
  // y dispara eventos cuando "coincide"
  var UsersRouter = Backbone.Router.extend({
    routes: {
      'users': 'showCollectionView',
      'users/detail/:id': 'showDetailView',
      'users/new': 'showFormView',
      'users/edit/:id': 'showFormView'
    },

    //
    initialize: function () {

      this.listenTo(UsersHandler, 'usersItemView:confirmRemove', _.bind(this.confirmRemove, this));
      this.listenTo(UsersHandler, 'usersCollectionView:filter', _.bind(this.filter, this));
      this.listenTo(UsersHandler, 'usersFormView:save', _.bind(this.save, this));
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
    // la vista UsersColllectioView
    showCollectionView: function () {
      var view = this.views['collection'];

      // Si no esta
      if (!view) {

        // Instanciamos
        view = new UsersColllectionView({collection: collection});

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
        message: 'Estas seguro de eliminar el usuario "' + view.model.get('name') + ' ' + view.model.get('lastname') + '"?',
        accept: function () {

          // Destruimos el modelo
          $.when(view.model.destroy())
            .done(function(){
              Modals.success({
                message: 'El usuario fue eliminado con exito!'
              });
            })
            .fail(function(){
              Modals.error({
                message: '',
                close: function () {

                  //@TODO ver si es necesario hacer algo
                }
              });
            });
        }
      });
    },

    // Instancia, si no estuviese previamente creada, y renderiza
    // la vista UsersDetailView
    // Si no existiera un usuario asociado al id, salta al listado
    showDetailView: function (id) {

      var success = _.bind(function (model) {
        var view = this.views['detail'];

        // Si ua existe
        if (!!view) {

          // Destruimos
          view.remove();
        }

        // Instanciamos
        view = new UsersDetailView({model: model});

        // Renderizamos
        $('#main').append(view.render().el);

        //
        this.views['detail'] = view;

        // Cambiamos a esta vista
        this.toggleView('detail');
      }, this);

      // Validamos que el usuario exista
      this.validate(id)
        .done(success);
    },

    // Instancia, si no estuviese previamente creada, y renderiza
    // la vista UsersFormView
    // Si no existiera un usuario asociado al id, salta al listado
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
        view = new UsersFormView({
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

        // Validamos que el usuario exista
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
            message: 'El usuario fue ' + (add? 'cargado' : 'actualizado') + ' con exito!',
            close: function () {

              self.navigate('users', {trigger: true});
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
          this.navigate('users', {trigger: true});
        }, this));

      return dfd.promise();
    }
  });

  return UsersRouter;
});
