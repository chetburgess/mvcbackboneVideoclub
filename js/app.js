define([
  'jquery',
  'underscore',
  'backbone',
  'modals',
  'routers/users',
  'routers/movies',
  'views/index'
], function ($, _, Backbone, Modals, UsersRouter, MoviesRouter, IndexView) {
  var app = {
    initialize: function () {

      //
      $(document).on('ajaxSend', function () {
        Modals.loading({show: true});
      });
      $(document).on('ajaxComplete', function () {
        Modals.loading({show: false});
      });
      
      var userRouter = new UsersRouter();
      var movieRouter = new MoviesRouter();

      var IndexRouter = Backbone.Router.extend({
        routes: {
          '': 'showIndexView'
        },
        routeInstances: {
          'users': userRouter,
          'movies': movieRouter
        },
        initialize: function() {
          userRouter.bind('all', $.proxy(this, 'handleRemnantCrudView', ['movies']));
          movieRouter.bind('all', $.proxy(this, 'handleRemnantCrudView',['users']));
          this.bind('all', $.proxy(this, 'handleRemnantCrudView',['users', 'movies']));
        },

        handleRemnantCrudView: function(remnantCrudViews, route, routeAction) {
          if (route === 'route' && routeAction){
            this.ocultarVista(remnantCrudViews);
          }
        },

        indexView: null,
        showIndexView: function () {
    
          if (!this.indexView) {

            this.indexView = new IndexView();
            $('#main').append(this.indexView.render().el);

          }

        },

        ocultarVista: function(remnantViews) {
          _.each(remnantViews, function(remnantView){
            if (this.routeInstances[remnantView].currentView) {
              this.routeInstances[remnantView].currentView.$el.addClass('hide');
            }
          }, this);
        }


      });

      // Instanciamos
      var router = new IndexRouter();

      // Iniciamos
      Backbone.history.start();
    }
  };


  return app;
});