define([
  'underscore',
  'backbone',
  'modals',
  'routers/users',
  'routers/movies',
  'views/index'
], function (_, Backbone, Modals, UsersRouter, MoviesRouter, IndexView) {
  var app = {
    initialize: function () {

      //
      $(document).on('ajaxSend', function () {
        Modals.loading({show: true});
      });
      $(document).on('ajaxComplete', function () {
        Modals.loading({show: false});
      });
      
      var indexRouter = Backbone.Router.extend({
        routes: {
          '': 'showIndexView'
        },

        indexView: null,
      
        showIndexView: function(){
    
          if (!!this.indexView){
            indexView.$el.removeClass('hide');
          }
          else{
            indexView = new IndexView();
            $('#main').append(indexView.render().el);  
            this.listenTo(indexView, 'ocultarIndex', this.ocultarVista);            
          }
       },

        ocultarVista: function(view) {
          indexView.$el.addClass('hide');
        }


      });

      // Instanciamos
      var router = new indexRouter();

      var userRouter = new UsersRouter();
      var movieRouter = new MoviesRouter();

      // Iniciamos
      Backbone.history.start();
    }
  };


  return app;
});