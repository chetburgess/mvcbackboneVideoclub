define([
  'underscore',
  'backbone',
  'modals',
  'routers/users',
  'routers/movies'
],
function (_, Backbone, Modals, UsersRouter, MoviesRouter) {

  var app = {
    initialize: function () {

      //
      $(document).on('ajaxSend', function () {
        Modals.loading({show: true});
      });
      $(document).on('ajaxComplete', function () {
        Modals.loading({show: false});
      });
      
      // Instanciamos
      var userRouter = new UsersRouter();
      var movieRouter = new MoviesRouter();

      // Iniciamos
      Backbone.history.start();
    }
  };


  return app;
});