define([
  'bbloader',
  'app/app',
  'app/modules/top/views/top'
], function (Backbone, App, TopView) {

	var top = App.module('Top', function (Top, App) {

		App.on('start', function () {

			this.vent.trigger('app:showTop', new TopView);
		});
	});

	return top;
});