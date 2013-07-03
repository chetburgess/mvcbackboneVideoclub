define([
  'backbone'
], function (Backbone) {

  var Button = Backbone.Model.extend({
    defaults : {
      label : '',
      routePath: '',
    },

  });
  return Button;
});