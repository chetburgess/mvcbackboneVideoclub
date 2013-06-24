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

      //
      this.indexView = new IndexView();
      $('#menu').append(this.indexView.render().el);
      
      //
      var userRouter = new UsersRouter();
      this.listenTo(userRouter, 'route', _.bind(this.setCurrentRouter, this, userRouter, 'users'));

      var movieRouter = new MoviesRouter();
      this.listenTo(movieRouter, 'route', _.bind(this.setCurrentRouter, this, movieRouter, 'movies'));

      // Iniciamos
      Backbone.history.start();
    },

    //
    currentRouter: null,
    setCurrentRouter: function (router, name) {

      // Si ya estabamos viendo una interfaz
      if (!!this.currentRouter) {

        // Si es la misma
        if (this.currentRouter._name === name) {

          return false;
        }
        else {

          this.currentRouter.currentView.$el.addClass('hide');
        }
      }

      this.currentRouter = router;
      this.currentRouter['_name'] = name;
      this.indexView.setActive(this.indexView.$el.find('li .' + name));
    }
  };

  _.extend(app, Backbone.Events);

  return app;
});