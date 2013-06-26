require.config({
	paths: {
		jquery: 'libs/jquery-1.9.1',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		bbloader: 'libs/backbone.loader',
		text: 'libs/text',
		bootstrap: 'libs/bootstrap',
		modals: 'libs/modals',
		'backbone.marionette': 'libs/backbone.marionette',
		'backbone.babysitter': 'libs/backbone.babysitter',
		'backbone.wreqr': 'libs/backbone.wreqr'
	}
});

require([
	'app/app',
	'app/modules/top/top',
	'app/modules/movies/movies'
], function(app, top, movies) {

	app.start();
});