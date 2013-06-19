define([
  'underscore',
  'backbone',
  'text!/templates/users/detail.html'  
], function(_, Backbone, UsersDetailHTML) {

	var UsersDetailView = Backbone.View.extend({
		tagName: 'div',
		className: 'span12',

		// Guardamos el template compilado para reutilizar
		template: _.template(UsersDetailHTML),

		render: function () {

			this.$el.html(this.template({model: this.model}));
			return this;
		}
	});

	return UsersDetailView;	
});