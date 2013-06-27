define([
  'bbloader',
  'text!app/modules/menu/views/templates/menu.html',
  'app/modules/menu/views/buttonView',
  'app/modules/menu/models/button'
], function (Backbone, menuHTML, buttonView, ButtonModel) {

	var MenuView = Backbone.Marionette.ItemView.extend({
	    template: menuHTML,
		  createButton: function(buttonMetadata){
		  	var button = new buttonView({model: new ButtonModel(buttonMetadata)});
		  	this.$el.find('.nav').append(button.render().el);
		  }
	});

	return MenuView;
});