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

	    render: function () {
	      this.$el.html(this.template({model: this.model}));
	      return this;
	    }

	});	

	return MovieDetailView;	
});		