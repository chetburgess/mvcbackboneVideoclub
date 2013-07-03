define([
	'bbloader',
	'modals',
	'app/common/eventHandler'
], function (Backbone, Modals, eventHandler) {

	var app = new Backbone.Marionette.Application();

	app.addRegions({
		top: '.top',
		menu: '.menu',
		main: '.main',
		modals: '.modals'
	});

	//
	app.vent.on('app:showView', function (view, module) {

		if (module){
			eventHandler.trigger('menu:highligthItemMenu', module);
		}

		this.main.show(view);
	}, app);
	app.vent.on('app:showTop', function (view) {

		this.top.show(view);
	}, app);
	app.vent.on('app:showMenu', function (view) {

		app.menu.show(view);
	});
	app.vent.on('app:showModal', function (view) {

		app.modals.show(view);
		view.$el.modal('show');
		view.setActiveTab(0);
	});
	app.vent.on('app:showSpinner', function () {

		Modals.loading({show: true});
	});
	app.vent.on('app:hideSpinner', function () {

		Modals.loading({show: false});
	});
	
	app.on('start', function () {

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