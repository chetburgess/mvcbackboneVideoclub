define([
  'underscore',
  'backbone',
  'text!/templates/movie/movie.html'  
], function(_, Backbone, MovieHTML) {

	var MovieDetailView = Backbone.View.extend({
		tagName: 'div',
   		className: 'span12',

		 // Guardamos el template compilado para reutilizar
	    template: _.template(MovieHTML),

	    render: function (selector) {

	      this.$el.html(this.template({model: this.model}));
	      this.$el.appendTo(selector);
	    }

	});	

	return MovieDetailView;	
});		