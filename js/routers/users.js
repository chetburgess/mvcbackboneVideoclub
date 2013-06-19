define([
  'jquery',
  'underscore',
  'backbone',
  'modals',
  'collections/users',
  'views/usersCollection',
  'views/usersForm',
  'views/usersDetail'
],
function ($, _, Backbone, Modals, UsersCollection, UsersColllectionView, UsersFormView, UsersDetailView) {

  //
  var usersCollection = new UsersCollection([]);

  // UsersRouter, es una clase que mapea la URL para convertirlas en acciones
  // y dispara eventos cuando "coincide"
  var UsersRouter = Backbone.Router.extend({
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
    // la vista UsersColllectioView
    showCollectionView: function () {
      var view = this.views['collection'];

      // Si no esta
      if (!view) {

        // Instanciamos
        view = new UsersColllectionView({collection: usersCollection});
        this.listenTo(view, 'filterItems', this.filterUsers);
        this.listenTo(view, 'removeUser', this.confirmRemoveUser);

        // Renderizamos
        $('#main').append(view.render().el);
      }
      this.filterUsers();

      //
      this.views['collection'] = view;

      // Cambiamos a esta vista
      this.toggleView('collection');
    },

    prevFilterParams: {},
    filterUsers: function (view, params) {

      if (!params) {
        params = this.prevFilterParams;
      }
      else {
        this.prevFilterParams = params;
      }
      usersCollection.remove(usersCollection.models);
      usersCollection.fetch({data: params});
    },

    confirmRemoveUser: function (view) {

      // Solicitamos confirmacion
      Modals.confirm({
        message: 'Estas seguro de eliminar el usuario "' + view.model.get('name') + ' ' + view.model.get('lastname') + '"?',
        accept: function () {

          // Destruimos el modelo
          view.model.destroy({
            // Si el modelo se elimino con exito
            success: function () {

              // Avisamos
              Modals.success({
                message: 'El usuario fue eliminado con exito!'
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
    // la vista UsersDetailView
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
        view = new UsersDetailView({model: model});

        // Renderizamos
        $('#main').append(view.render().el);

        //
        this.views['detail'] = view;

        // Cambiamos a esta vista
        this.toggleView('detail');
      }, this);

      // Validamos que la pelicula exista
      this.validateUser(id, success);
    },

    // Instancia, si no estuviese previamente creada, y renderiza
    // la vista UsersFormView
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
          model = new usersCollection.model({});
        }

        // Instanciamos
        view = new UsersFormView({
          collection: usersCollection
          , model: model
        });
        this.listenTo(view, 'saveUser', this.saveUser);

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
        this.validateUser(id, success);
      }
      else {
        success(false);
      }
    },

    saveUser: function (model, attrs) {
      var self = this,
        add = !model.id;

      // Guardamos
      model.save(attrs)
        .done(function(){
          // Avisamos
          Modals.success({
            message: 'El cliente fue ' + (add? 'cargado' : 'actualizado') + ' con exito!',
            close: function () {

              self.navigate('users', {trigger: true});
            }
          });
        })
        .fail(function(response){
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
/*
      model.save(attrs, {
        success: function (model, xhr, opt) {

          // Avisamos
          Modals.success({
            message: 'El cliente fue ' + (add? 'cargado' : 'actualizado') + ' con exito!',
            close: function () {

              self.navigate('users', {trigger: true});
            }
          });
        },
        error: function (mod, xhr, opt) {

          var msg = 'Ha ocurrido un error.<br />Por favor, recarge pa pagina.';

          //@TODO Ver de centralizar este analisis
          if (xhr.status === 409) {
            msg = 'El registro ya ha sido actualizada por otro usuario.<br />Actualice la p&aacute;gina para ver los nuevos datos.';
          }

          // 
          Modals.error({
            message: msg
          });
       
        }
      });
*/         
    },

    //
    validateUser: function (id, callback) {
      
      var model = new usersCollection.model({_id: id}),
        error = _.bind(function () {
          
          // Mostramos el listado
          this.navigate('users', {trigger: true});
        }, this);


      $.when(model.fetch())
        .done(function(response){
          callback(model);
        })
        .fail(error);
/*
      // Buscamos los datos de la pelicula
      model.fetch({
       success: function (model, resp, options) {
          model.once('sync', function(model){
            callback(model);
          },this);        
        },
        error: error
      });
*/
    }
  });

  return UsersRouter;
});
