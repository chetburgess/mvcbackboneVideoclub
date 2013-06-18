define([
  'underscore',
  'backbone'
], function(_, Backbone) {

  var BaseModel = Backbone.Model.extend({
    urlRoot: 'http://socramg.iriscouch.com/videoclub/',

    idAttribute: '_id',
    destroy: function (options) {

      var options = options || {};
      options['headers'] = {'IF-Match': this.get('_rev')};
      Backbone.Model.prototype.destroy.call(this, options);
    }
  });

  return BaseModel;
});


