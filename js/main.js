require.config({
	paths: {
		jquery: 'libs/jquery-1.9.1',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		bbloader: 'libs/backbone.loader',
		text: 'libs/text',
		bootstrap: 'libs/bootstrap',
		modals: 'libs/modals'
	}
});

require([
	'app/app'
], function(App) {

	App.start();
});