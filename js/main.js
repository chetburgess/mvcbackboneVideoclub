require.config({
	paths: {
		jquery: 'libs/jquery-1.9.1',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		text: 'libs/text',
		bootstrap: 'libs/bootstrap',
		modals: 'libs/modals'
	}
});

require([
	'router',
  'bootstrap',
  'modals'
], function(App, bootstrap, modals) {

	App.initialize();
});