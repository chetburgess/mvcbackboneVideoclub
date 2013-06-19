define([
  'underscore',
  'backbone',
  'text!/templates/movies/detail.html'  
], function(_, Backbone, MoviesHTML) {

	var MoviesDetailView = Backbone.View.extend({
		tagName: 'div',
		className: 'span12',

		// Guardamos el template compilado para reutilizar
		template: _.template(MoviesHTML),

		render: function () {

			this.$el.html(this.template({model: this.model}));
			return this;
		}

	});

	return MoviesDetailView;	
});