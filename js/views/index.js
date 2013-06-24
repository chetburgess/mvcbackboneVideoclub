define([
	'jquery',
  'underscore',
  'backbone',
  'text!/templates/index.html'  
], function($, _, Backbone, IndexHTML) {

	var IndexView = Backbone.View.extend({
		tagName: 'div',

	    //
	    events: {
	      'click a': 'setActiveEvent'
	    },

		// Guardamos el template compilado para reutilizar
		template: _.template(IndexHTML),
	
		render: function () {
			
			this.$el.html(this.template());
			return this;
		},

		//
		setActiveEvent: function (evt)  {
			this.setActive($(evt.target));
		},

		//
		setActive: function ($el)  {
			this.$el.find('li.active').removeClass('active');
			$el.parent().addClass('active');
		}
	});

	return IndexView;	
});