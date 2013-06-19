define([
  'backbone',
  'collections/base',
  'models/user'
], function(Backbone, BaseCollection, UserModel) {
  
  // UserCollection, es una clase que que agrupa/ordena/pagina/etc modelos del mismo tipo
  var UserCollection = BaseCollection.extend({
    model: UserModel,
    url: 'http://socramg.iriscouch.com/users/_design/app/_list/get/users'
  });

  return UserCollection;
});