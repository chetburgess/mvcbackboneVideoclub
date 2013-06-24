define([
  'underscore',
  'backbone',
  'text!/templates/users/form.html',
  'eventHandlers/usersHandler'
], function(_, Backbone, UserFormHTML, UsersHandler) {
  
  // UserFormView es un clase que representa la vista del
  // usuario en el listado de usuarios
  var UserFormView = Backbone.View.extend({
    // Idicamos que queremos se cree dentro de un div
    tagName: 'div',
    className: 'span12',

    //
    events: {
      'submit .user-form': 'saveUser'
    },

    // Guardamos el template compilado para reutilizar
    template: _.template(UserFormHTML),
    render: function () {
      
      this.$el.html(this.template({model: this.model}));
      return this;
    },
    
    // Guardamos los cambios en el modelo
    saveUser: function (evt) {
      
      var attrs = {};

      // Buscamos los inputs y obtenemos el valor
      $(evt.target).find(':input').not('button').each(function () {

        var el = $(this);
        attrs[el.attr('name')] = el.val();
      });

      //
      UsersHandler.trigger('usersFormView:save', this.model, attrs);

      //
      evt.preventDefault();
      return false; // Evitamos que se recarge la pagina
    }
  });

  return UserFormView;
});