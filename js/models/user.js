define([
  'backbone',
  'models/base'
], function(Backbone, BaseModel) {

  var User = BaseModel.extend({
    urlRoot: 'http://socramg.iriscouch.com/users/',

    defaults: {
      name: '',
      lastname: '',
      email: '',
      level: ''
    },

    validate: function (attrs) {
      
      var error = [];

      if (!attrs.name.trim()) {
        error.push({value: 'name', msj: 'Ingresa el nombre del usuario'});
      }
      if (!attrs.lastname.trim()) {
        error.push({value: 'lastname', msj: 'Ingresa el apellido del usuario'});
      }
      if (!attrs.email.trim()) {
        error.push({value: 'email', msj: 'Ingresa el e-mail del usuario'});
      }
      else if (!attrs.email.match(/[a-z0-9_.-]+@[a-z0-9_.-]/ig)) {
        error.push({value: 'email', msj: 'El e-mail que ingresaste no es valido'});
      }
      if (!attrs.level.trim()) {
        error.push({value: 'level', msj: 'Selecciona el nivel del usuario'});
      }
      else if (!attrs.level.match(/(admin|client)/ig)) {
        error.push({value: 'level', msj: 'El nivel que seleccionaste no es valido'});
      }

      if (error.length > 0) {
        return error;
      }
    }
  });

  return User;
});