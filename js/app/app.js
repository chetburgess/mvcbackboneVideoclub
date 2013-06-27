define([
	'bbloader',
	'modals',
	'app/common/eventHandler'
], function (Backbone, Modals, eventHandler) {

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
	app.vent.on('app:showTop', function (view) {

		this.top.show(view);
	}, app);
	app.vent.on('app:showMenu', function (view) {
		app.menu.show(view);
	});

	//
	app.on('start', function () {

      //
      $(document).on('ajaxSend', function () {
        Modals.loading({show: true});
      });
      $(document).on('ajaxComplete', function () {
        Modals.loading({show: false});
      });

      //
      Backbone.history.start();
	});

	//
	eventHandler.on('app:showError', function (config) {

		Modals.error(config);
	});
	eventHandler.on('app:showSuccess', function (config) {

		Modals.success(config);
	});
	eventHandler.on('app:showConfirm', function (config) {

		Modals.confirm(config);
	});

	return app;
});