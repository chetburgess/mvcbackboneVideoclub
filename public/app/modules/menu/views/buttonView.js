define([
  'bbloader',
  'text!app/modules/menu/views/templates/buttonView.html'
], function (Backbone, buttonHTML) {

	var ButtonView = Backbone.Marionette.ItemView.extend({
	    template: buttonHTML,
	    tagName: 'li'
	});

	return ButtonView;
});