define([
  'bbloader',
  'text!app/modules/menu/views/templates/menu.html',
  'app/modules/menu/views/buttonView',
  'app/modules/menu/models/button'
], function (Backbone, menuHTML, ButtonView, ButtonModel) {

	var MenuView = Backbone.Marionette.ItemView.extend({
	    template: menuHTML,
		  createButton: function(buttonMetadata){
		  	var button = new ButtonView({model: new ButtonModel(buttonMetadata)});
		  	this.$el.find('.nav').append(button.render().el);
		  },
		  updateHighligthedItem: function(data){
		  	var itemSelector = '.nav a[href="' + data.routePath + '"]';
		  	this.$el.find('.nav li').removeClass('active');
		  	this.$el.find(itemSelector).closest('li').addClass('active');
		  }
	});

	return MenuView;
});