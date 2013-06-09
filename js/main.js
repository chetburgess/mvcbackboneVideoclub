require.config({
	paths: {
		jquery: 'libs/jquery-1.9.1',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		localstorage: 'libs/backbone.localStorage',
		text: 'libs/text'
	}
});

require(['router'], function(App) {

	App.initialize();
});