define([
  'bbloader',
  'app/common/eventHandler'
], function (Backbone, eventHandler) {

	var App = new Backbone.Marionette.Application();

	App.addRegions({
		top: '.top',
		menu: '.menu',
		main: '.main'
	});

	eventHandler.on('app:showView', function (view) {

		App.main.show(view);
	});

	return App;
});