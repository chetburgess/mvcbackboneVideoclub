define([
	'bbloader'
], function (Backbone) {

	var MoviesRouter = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
			'movies': 'showCollectionView',
			'movies/detail/:id': 'showDetailView',
			'movies/new': 'showFormView',
			'movies/edit/:id': 'showFormView'
		}
	});

	return MoviesRouter;
});