define([
	'bbloader',
	'app/common/eventHandler'
], function (Backbone, eventHandler) {

	var app = new Backbone.Marionette.Application();

	app.addRegions({
		top: '.top',
		menu: '.menu',
		main: '.main'
	});

	//
	app.vent.on('app:showView', function (view) {

		this.main.show(view);
	}, app);

	//
	app.vent.on('app:showTop', function (view) {

		this.top.show(view);
	}, app);

	//
	app.on('start', function () {

      Backbone.history.start();
	});

	return app;
});