define([
  'underscore',
  'backbone',
  'text!/templates/movies/detail.html'  
], function(_, Backbone, MoviesDetailHTML) {

	var MoviesDetailView = Backbone.View.extend({
		tagName: 'div',
		className: 'span12',

		// Guardamos el template compilado para reutilizar
		template: _.template(MoviesDetailHTML),

		render: function () {

			this.$el.html(this.template({model: this.model}));
			return this;
		}
	});

	return MoviesDetailView;	
});