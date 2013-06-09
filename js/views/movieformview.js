define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars'
], function($, _, Backbone, Handlebars) {
    var MovieFormView = Backbone.View.extend({
      el: '#movie-form-container',
    	templateSelector: '#movie-form',
      model: null,
      events: {
        'click .save': 'saveMovie'
      },
      initialize: function() {
          var source   = $(this.templateSelector).html();
          this.template = Handlebars.compile(source);
      },
      render: function(){
          this.$el.html(this.template(this.model.toJSON()));
          return this;
      },
      saveMovie: function(event){
        event.preventDefault();
        //@TODO fill the 2 callback with proper params
        var options = {
            success: function () {
                //hideErrors
            },
            error: function (model, errors){
                //showErrors messages
            }
        };
        var inputList = this.$el.find('form').serializeArray();
        var inputsObject = _(inputList).reduce(function(acc, field) {
          acc[field.name] = field.value;
          return acc;
        }, {});
        //@TODO Actualmente este save tambien agrega el modelo al collection del router, como lo logra???????
        this.model.save(inputsObject, options);
   //     this.trigger('savedMovie');
      }
    });
    return MovieFormView;
});