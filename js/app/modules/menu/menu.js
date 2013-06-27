define([
  'bbloader',
  'app/app',
  'app/modules/menu/views/menu',
  'app/common/eventHandler'
], function (Backbone, app, MenuView, eventHandler) {

	var menu = app.module('Menu', function(Menu, app){
		this.menuView = new MenuView(); 
    this.initialize =  function(){
      eventHandler.on('menu:createButton', this.doCreateButton, this);
      app.vent.trigger('app:showMenu', this.menuView);
    };
    this.on('start', this.initialize, this);

    this.doCreateButton = function(buttonMetadata){
      this.menuView.createButton(buttonMetadata);
    };
	});

	return menu;
});