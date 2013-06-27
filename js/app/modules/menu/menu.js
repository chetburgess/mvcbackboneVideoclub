define([
  'bbloader',
  'app/app',
  'app/modules/menu/views/menu',
  'app/common/eventHandler'
], function (Backbone, app, MenuView, eventHandler) {

	app.module('menuModule', function(menuModule, app){
		this.menuView = new MenuView(); 
    this.initialize =  function(){
      eventHandler.on('menuView:createButton', this.doCreateButton, this);
      app.vent.trigger('app:showMenu', this.menuView);
    };
    this.on('start', this.initialize, this);

    this.doCreateButton = function(buttonMetadata){
      this.menuView.createButton(buttonMetadata);
    };
	});

	return app.menuModule;
});