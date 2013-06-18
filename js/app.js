define([
  'underscore',
  'backbone',
  'modals',
  'routers/users',
],
function (_, Backbone, Modals, UsersRouter) {

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

      // Iniciamos
      Backbone.history.start();
    }
  };


  return app;
});