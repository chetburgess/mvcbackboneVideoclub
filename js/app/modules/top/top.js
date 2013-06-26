define([
  'app/app',
  'app/modules/top/views/top'
], function (app, TopView) {

	var top = app.module('Top', function (Top, app) {

		// Cuando la aplicacion arraque le decimos que mostrar en el Top
		app.on('start', function () {

			this.vent.trigger('app:showTop', new TopView);
		});
	});

	return top;
});