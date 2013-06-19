define([
  'underscore',
  'backbone',
  'text!/templates/index.html'  
], function(_, Backbone, IndexHTML) {

	var IndexView = Backbone.View.extend({
		tagName: 'div',

		// Guardamos el template compilado para reutilizar
		template: _.template(IndexHTML),
	
		events: {
	      'click .boton': 'hide',
	    },

		render: function () {
			
			this.$el.html(this.template());
			return this;
		},

		hide: function (evt) {

			this.trigger('ocultarIndex', this);
		}

	});

	return IndexView;	
});